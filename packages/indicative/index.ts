/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Validator } from './src/Validator'
import { ValidationOptions } from './src/Contracts'
import { DataNode, Schema, Messages } from 'indicative-compiler'

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

export { is, rules } from 'indicative-rules'
