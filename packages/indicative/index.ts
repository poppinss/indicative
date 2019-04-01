/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { validations, is, rules } from 'indicative-rules'
import { DataNode, Schema, Messages, Validation, FormatterContract } from 'indicative-compiler'
import { configure } from './src/config'
import { Validator } from './src/Validator'
import { ValidationOptions, FormatterConstructorContract } from './src/Contracts'

/**
 * Global validator
 */
const validator = new Validator()

/**
 * Validate user data and stop on first validation failure.
 */
export function validate<Data extends DataNode> (
  data: Data,
  rules: Schema,
  messages?: Messages,
  options?: Partial<ValidationOptions>,
) {
  return validator.validate(data, rules, messages || {}, options || {})
}

/**
 * Validate user data and continue even when validation
 * fails
 */
export function validateAll<Data extends DataNode> (
  data: Data,
  rules: Schema,
  messages?: Messages,
  options?: Partial<ValidationOptions>,
) {
  return validator.validateAll(data, rules, messages || {}, options || {})
}

/**
 * Extend validator by adding a new validation it. The global `validations`
 * object is extended.
 */
export function extend (ruleName: string, validation: Validation): void {
  validations[ruleName] = validation
}

export { is, rules, FormatterContract, FormatterConstructorContract, configure }
