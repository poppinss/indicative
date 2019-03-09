/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Runner } from './Runner'
import { Executor } from './Executors/Executor'
import { MessageBuilder } from './MessageBuilder'
import { ArrayWrapper } from './Executors/ArrayWrapper'

import {
  SchemaNodeLiteral,
  SchemaNodeObject,
  SchemaNodeArray,
  ParsedSchema,
  ParsedRule,
  MessageNode,
  Schema,
  Messages,
  ParsedMessages,
  schemaParser,
  messagesParser,
} from 'indicative-parser'

import {
  ValidationsNode,
  ExecutorFn,
  SchemaExecutorFn,
  MessageBuilderContract,
  CompilerFn,
  ValidationNode,
} from './contracts'

/**
 * Since the length of an array is not known at compile time. We need to wrap all executor functions
 * defined on array based rules inside another executor to execute them based upon the length of an
 * array. CONFUSING? OKAY LET'S BREAK IT DOWN.
 *
 * 1. Rules are defined as `{ 'users.*.username': 'required|unique' }`. With this, at compile time,
 *    we know that, `two` validations needs to be executed on `username`. So we create an array of
 *    two functions that runs `required` and `unique` validations.
 *
 * 2. We don't know how many users will be there, until we get the actual data (runtime). So we need
 *    to loop over all the users and execute previously compiled functions for each user. This is
 *    what this method does. It receives an array of `validation methods` and loop over them as
 *    required.
 *
 * 3. If index is know, for example: `{ 'users.0.username': 'required|unique' }`. Then, instead
 *    of looping, we just run validations for that index.
 */
function arrayExecutor (executors: ExecutorFn[], dotPath: string[], index: string): ExecutorFn {
  const instance = new ArrayWrapper(executors, dotPath, index)
  const hasAsync = executors.find((e) => e.async)

  return hasAsync ? {
    async: true,
    fn: instance.execAsync.bind(instance),
  } : {
    async: false,
    fn: instance.exec.bind(instance),
  }
}

/**
 * Returns a function, which takes the data as an input to
 * execute the validation. All of the hard work is done
 * at the compile time and we just need to execute
 * the returned function at runtime.
 *
 * Things to note:
 *
 * 1. `dotPath` is the dot syntax path to the nearest object for the field
 *    under validation. `dotPath` for `{ user: { profile: { username } } }`
 *    for field `username` will be `user.profile`.
 *
 * 2. Dot path is computed from the user schema definition.
 *
 * 3. If data value for the given `dotPath` is not a strict object, then
 *    validation will be skipped.
 *
 * 4. To ensure that top level value is an object, we suggest putting validation
 *    top level object for being required.
 */
function getExecutorForRule (
  validationFn: ValidationNode,
  rule: ParsedRule,
  field: string,
  dotPath: string[],
  type: 'literal' | 'object' | 'array',
  message: MessageNode,
): ExecutorFn {
  /**
   * Compile args when validation has a `compile` method
   */
  if (typeof (validationFn.compile) === 'function') {
    rule.args = validationFn.compile(rule.args)
  }

  const executorInstance = new Executor(validationFn.validate, message, rule, field, dotPath, type)

  if (validationFn.async) {
    return {
      async: true,
      fn: executorInstance.execAsync.bind(executorInstance),
    }
  }

  return {
    async: false,
    fn: executorInstance.exec.bind(executorInstance),
  }
}

/**
 * Returns an array of executors for a literal node type. Literals
 * are final properties on a given object.
 *
 * Dot path is computed on the basis of the schema tree.
 */
const getLiteralExecutors: SchemaExecutorFn = (
  node: SchemaNodeLiteral,
  validations,
  _builder,
  field,
  dotPath,
  messages,
) => {
  return node.rules.map((rule) => {
    return getExecutorForRule(validations[rule.name], rule, field, dotPath, 'literal', messages.get(rule))
  })
}

/**
 * Returns an array of executors for `object` type node. A flat array is created
 * for the actual object and it's children (if any).
 */
const getObjectExecutors: SchemaExecutorFn = (
  node: SchemaNodeObject,
  validations,
  builder,
  field,
  dotPath,
  messages,
) => {
  let executors: ExecutorFn[] = []

  /**
   * If there are rules on the actual object, then build executors for
   * that object
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => {
      return getExecutorForRule(validations[rule.name], rule, field, dotPath, 'object', messages.get(rule))
    })
  }

  /**
   * Increment dotPath and push the current object key, so that children
   * are dependent on sub object and not root object.
   */
  dotPath = dotPath.concat(field)

  /**
   * Compile executors for children inside the object and concat them to the original
   * list of executors.
   */
  const childExecutors = schemaCompiler(node.children, validations, builder, dotPath)
  executors = executors.concat(childExecutors)
  return executors
}

/**
 * Returns an array of executor functions for validating the top leve array (if rules defined)
 * along with wrapped validators for each node inside the array.
 */
const getArrayExecutors: SchemaExecutorFn = (
  node: SchemaNodeArray,
  validations,
  builder,
  field,
  dotPath,
  messages,
) => {
  let executors: ExecutorFn[] = []

  /**
   * Compile executors for the validations on the actual array node.
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => {
      return getExecutorForRule(validations[rule.name], rule, field, dotPath, 'array', messages.get(rule))
    })
  }

  /**
   * Update dot path by pushing the current array key to it.
   */
  dotPath = dotPath.concat(field)

  /**
   * Now we create a list of executors for each child inside the array. Since
   * the length of array is unknow at compile time, we wrap those executors
   * inside a top level function, which runs child executors after knowing
   * the length and shape of array.
   *
   * This operation is expensive over other operations, since we create a waterfall
   * inside a waterfall.
   */
  const wrappedExecutors = Object.keys(node.each)
    .reduce((result: ExecutorFn[], schemaIndex: string) => {
      /**
       * Since shape of children is known at compile time, we build
       * an array of executors for them and wrap them inside a
       * function that executes this list for each item inside
       * the array
       */
      const eachExecutors = schemaCompiler(
        node.each[schemaIndex].children,
        validations,
        builder.child(dotPath.concat(schemaIndex)),
        [],
      )

      result.push(arrayExecutor(eachExecutors, dotPath, schemaIndex))
      return result
    }, [])

  executors = executors.concat(wrappedExecutors)
  return executors
}

/**
 * Compiles the parsed schema tree into an array of executor functions, which
 * can be invoked inside a promisfied loop at runtime.
 */
function schemaCompiler (
  tree: ParsedSchema,
  validations: ValidationsNode,
  builder: MessageBuilderContract,
  nodePath: string[] = [],
): ExecutorFn[] {
  return Object
    .keys(tree)
    .reduce((result: ExecutorFn[], field: string) => {
      const node = tree[field]
      const nodeMessage = builder.getBucket(field, nodePath)

      if (node.type === 'literal') {
        result = result.concat(getLiteralExecutors(node, validations, builder, field, nodePath, nodeMessage))
      }

      if (node.type === 'object') {
        result = result.concat(getObjectExecutors(node, validations, builder, field, nodePath, nodeMessage))
      }

      if (node.type === 'array') {
        result = result.concat(getArrayExecutors(node, validations, builder, field, nodePath, nodeMessage))
      }

      return result
    }, [])
}

/**
 * Compiles user defined schema along with messages and validations to an executable
 * function highly optimized for speed.
 */
export function compile (schema: Schema, validations: ValidationsNode, messages: Messages): CompilerFn {
  let parsedSchema: ParsedSchema | null = schemaParser(schema)
  let parsedMessages: ParsedMessages | null = messagesParser(messages)
  const builder = new MessageBuilder(parsedMessages)

  const executors = schemaCompiler(parsedSchema, validations, builder)
  const runner = new Runner(executors)

  /**
   * Cleanup memory
   */
  parsedSchema = null
  parsedMessages = null

  return runner.exec.bind(runner)
}
