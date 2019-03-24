/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationRunner } from './Runner/ValidationRunner'
import { MessagesStore } from './MessagesStore'
import { Executor } from './Executors/Executor'
import { ArrayWrapper } from './Executors/ArrayWrapper'

import {
  SchemaNodeLiteral,
  SchemaNodeObject,
  SchemaNodeArray,
  ParsedSchema,
  ParsedRule,
  Message,
  Schema,
  Messages,
  ParsedMessages,
  rulesParser,
  messagesParser,
} from 'indicative-parser'

import {
  Validations,
  ExecutorFunction,
  SchemaNodeConsumer,
  MessagesStoreContract,
  ValidationRunnerFunction,
  Validation,
} from './Contracts'

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
function getExecutorForArray (
  childExecutors: ExecutorFunction[],
  dotPath: string[],
  index: string,
): ExecutorFunction {
  const instance = new ArrayWrapper(childExecutors, dotPath, index)
  const hasAsync = childExecutors.find((e) => e.async)

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
function getExecutorForLiteral (
  validationFn: Validation,
  rule: ParsedRule,
  field: string,
  dotPath: string[],
  type: 'literal' | 'object' | 'array',
  message: Message,
): ExecutorFunction {
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
const literalNodeConsumer: SchemaNodeConsumer = (
  node: SchemaNodeLiteral,
  validations,
  store,
  field,
  dotPath,
) => {
  return node.rules.map((rule) => {
    return getExecutorForLiteral(
      validations[rule.name],
      rule,
      field,
      dotPath,
      'literal',
      store.getMessageFor(field, rule),
    )
  })
}

/**
 * Returns an array of executors for `object` type node. A flat array is created
 * for the actual object and it's children (if any).
 */
const objectNodeConsumer: SchemaNodeConsumer = (
  node: SchemaNodeObject,
  validations,
  store,
  field,
  dotPath,
) => {
  let executors: ExecutorFunction[] = []

  /**
   * If there are rules on the actual object, then build executors for
   * that object
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => {
      return getExecutorForLiteral(
        validations[rule.name],
        rule,
        field,
        dotPath,
        'object',
        store.getMessageFor(field, rule),
      )
    })
  }

  dotPath = dotPath.concat(field)

  /**
   * Compile executors for children inside the object and concat them to the original
   * list of executors.
   */
  const childExecutors = schemaCompiler(node.children, validations, store.getChildStore([field]), dotPath)
  executors = executors.concat(childExecutors)
  return executors
}

/**
 * Returns an array of executor functions for validating the top leve array (if rules defined)
 * along with wrapped validators for each node inside the array.
 */
const arrayNodeConsumer: SchemaNodeConsumer = (
  node: SchemaNodeArray,
  validations,
  store,
  field,
  dotPath,
) => {
  let executors: ExecutorFunction[] = []

  /**
   * Compile executors for the validations on the actual array node.
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => {
      return getExecutorForLiteral(
        validations[rule.name],
        rule,
        field,
        dotPath,
        'array',
        store.getMessageFor(field, rule),
      )
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
    .reduce((result: ExecutorFunction[], schemaIndex: string) => {
      /**
       * Since shape of children is known at compile time, we build
       * an array of executors for them and wrap them inside a
       * function that executes this list for each item inside
       * the array
       */
      const eachExecutors = schemaCompiler(
        node.each[schemaIndex].children,
        validations,
        store.getChildStore([field].concat(schemaIndex)),
        [],
      )

      result.push(getExecutorForArray(eachExecutors, dotPath, schemaIndex))
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
  validations: Validations,
  store: MessagesStoreContract,
  nodePath: string[] = [],
): ExecutorFunction[] {
  return Object
    .keys(tree)
    .reduce((result: ExecutorFunction[], field: string) => {
      const node = tree[field]

      if (node.type === 'literal') {
        result = result.concat(
          literalNodeConsumer(node, validations, store, field, nodePath),
        )
      }

      if (node.type === 'object') {
        result = result.concat(
          objectNodeConsumer(node, validations, store, field, nodePath),
        )
      }

      if (node.type === 'array') {
        result = result.concat(
          arrayNodeConsumer(node, validations, store, field, nodePath),
        )
      }

      return result
    }, [])
}

/**
 * Compiles user defined schema along with messages and validations to an executable
 * function highly optimized for speed.
 */
export function compileValidationsSchema (
  schema: Schema,
  validations: Validations,
  messages: Messages,
): ValidationRunnerFunction {
  let parsedSchema: ParsedSchema | null = rulesParser(schema)
  let parsedMessages: ParsedMessages | null = messagesParser(messages)

  const store = new MessagesStore(parsedMessages.fields, parsedMessages.rules)

  const executors = schemaCompiler(parsedSchema, validations, store)
  const runner = new ValidationRunner(executors)

  /**
   * Cleanup memory
   */
  parsedSchema = null
  parsedMessages = null

  return runner.exec.bind(runner)
}
