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

export function validate<Data extends DataNode> (
  data: Data,
  rules: Schema,
  messages?: Messages,
  options?: Partial<ValidationOptions>,
) {
  return validator.validate(data, rules, messages || {}, options || {})
}

export function validateAll<Data extends DataNode> (
  data: Data,
  rules: Schema,
  messages?: Messages,
  options?: Partial<ValidationOptions>,
) {
  return validator.validateAll(data, rules, messages || {}, options || {})
}
