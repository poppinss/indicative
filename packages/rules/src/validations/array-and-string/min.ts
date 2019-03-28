/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { skippable, cast, ensureLength } from 'indicative-utils'

import { ArgComparison, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'min: make sure to define min length'
const INVALID_TYPE = 'min: length must be defined as an integer'

/**
 * Ensure the length of an array or string is greater than the defined
 * length.
 *
 * Validation fails if user input is a not a valid array or string.
 *
 * ```js
 * const rules = {
 *   password: 'min:6'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rules.min(6)
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    ensureLength(args, MISSING_VALUE, 1)

    const minLength = cast(args[0], 'number', INVALID_TYPE)
    return [minLength]
  },

  validate: (data, field, [minLength]: ArgComparison, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    if (Array.isArray(fieldValue) || typeof (fieldValue) === 'string') {
      return fieldValue.length >= minLength
    }

    return false
  },
}

export { validation as default }
