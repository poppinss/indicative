/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { rulesParser, Schema } from 'indicative-parser'

import { astWalker } from '../AstWalker'
import { NodeConsumer, ArrayChildWrapper } from '../Contracts/AstWalker'
import { Sanitizations, SanitizationExecutor, NodeConsumerArgs } from '../Contracts/SanitizationCompiler'
import { SanitizationRunner } from './SanitizationRunner'
import { ArrayRunner } from './ArrayRunner'
import { FinalRunner } from './FinalRunner'

/**
 * Consumes the tree node and returns a top level object to perform
 * validation by passing runtime data to it. The output function
 * is highly optimized for speed.
 */
const nodeConsumer: NodeConsumer<NodeConsumerArgs, SanitizationExecutor> = (
  rule,
  field,
  type,
  [sanitizations],
  dotPath,
) => {
  const sanitization = sanitizations[rule.name]
  if (!sanitization) {
    throw new Error(`${rule.name} is not registered as a sanitizer`)
  }

  /**
   * Call compile method when exists
  */
  if (typeof (sanitization.compile) === 'function') {
    rule.args = sanitization.compile(rule.args)
  }

  const runner = new SanitizationRunner(sanitization, field, rule, type, dotPath)
  return runner.exec.bind(runner)
}

/**
 * Wraps child validations of an array inside a wrapper. The wrapper then
 * executes them based upon the length of the array at runtime.
 */
const arrayWrapper: ArrayChildWrapper<SanitizationExecutor> = (
  child: SanitizationExecutor[],
  dotPath: string[],
  index: string,
): SanitizationExecutor => {
  const arrayRunner = new ArrayRunner(child, dotPath, index)
  return arrayRunner.exec.bind(arrayRunner)
}

/**
 * Compiles user schema, validations and messages to a top level function.
 */
export function sanitizationCompiler (schema: Schema, sanitizations: Sanitizations) {
  const parsedRules = rulesParser(schema)

  const stack = astWalker(parsedRules, [sanitizations], nodeConsumer, arrayWrapper)
  const runner = new FinalRunner(stack)
  return runner.exec.bind(runner)
}
