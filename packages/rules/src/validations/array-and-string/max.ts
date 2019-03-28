/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ensureLength, cast, skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { ArgComparison, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'max: make sure to define max length'
const INVALID_TYPE = 'max: length must be defined as an integer'

/**
 * Ensure the length of an array or string is not over the defined
 * length.
 *
 * Validation fails if user input is a not a valid array or string.
 *
 * ```js
 * const rules = {
 *   username: 'max:40'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rules.max(40)
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  /**
   * Cleaning up user arguments to make sure that they are
   * useable at runtime
   */
  compile (args): any[] {
    ensureLength(args, MISSING_VALUE, 1)
    const maxLength = cast(args[0], 'number', INVALID_TYPE)
    return [maxLength]
  },

  /**
   * Validating runtime data
   */
  validate: (data, field, [maxLength]: ArgComparison, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    if (Array.isArray(fieldValue) || typeof (fieldValue) === 'string') {
      return fieldValue.length <= maxLength
    }

    return false
  },
}

export { validation as default }
