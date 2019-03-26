/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { rulesParser, messagesParser, Schema, Messages } from 'indicative-parser'

import { astWalker } from '../AstWalker'
import { getMessageFromPath } from '../utils'
import { FinalRunner } from './FinalRunner'
import { ArrayRunner } from './ArrayRunner'
import { ValidationRunner } from './ValidationRunner'
import { NodeConsumer, ArrayChildWrapper } from '../Contracts/AstWalker'
import { Validations, ValidationExecutor, NodeConsumerArgs } from '../Contracts/ValidationCompiler'

/**
 * Consumes the tree node and returns a top level object to perform
 * validation by passing runtime data to it. The output function
 * is highly optimized for speed.
 */
const nodeConsumer: NodeConsumer<NodeConsumerArgs, ValidationExecutor> = (
  rule,
  field,
  type,
  [validations, messages],
  dotPath,
  resetPath,
) => {
  const validation = validations[rule.name]
  if (!validation) {
    throw new Error(`${rule.name} is not registered as a validation`)
  }

  /**
   * Call compile method when exists
  */
  if (typeof (validation.compile) === 'function') {
    rule.args = validation.compile(rule.args)
  }

  const message = getMessageFromPath(messages, field, rule, resetPath.concat(dotPath))
  const runner = new ValidationRunner(validation, field, rule, message, type, dotPath)

  if (validation.async) {
    return { async: true, fn: runner.execAsync.bind(runner) }
  }

  return { async: false, fn: runner.exec.bind(runner) }
}

/**
 * Wraps child validations of an array inside a wrapper. The wrapper then
 * executes them based upon the length of the array at runtime.
 */
const arrayWrapper: ArrayChildWrapper<ValidationExecutor> = (
  child: ValidationExecutor[],
  dotPath: string[],
  index: string,
): ValidationExecutor => {
  const arrayRunner = new ArrayRunner(child, dotPath, index)

  if (child.find((executor) => executor.async)) {
    return { async: true, fn: arrayRunner.execAsync.bind(arrayRunner) }
  }

  return { async: false, fn: arrayRunner.exec.bind(arrayRunner) }
}

/**
 * Compiles user schema, validations and messages to a top level function.
 */
export function validationCompiler (schema: Schema, validations: Validations, messages: Messages) {
  const parsedRules = rulesParser(schema)
  const parsedMessages = messagesParser(messages)

  const stack = astWalker(parsedRules, [validations, parsedMessages], nodeConsumer, arrayWrapper)

  const runner = new FinalRunner(stack)
  return runner.exec.bind(runner)
}
