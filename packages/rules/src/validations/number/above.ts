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

import { above as isAbove } from '../../raw/above'
import { ArgComparison, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'above:make sure to define minValue'
const INVALID_TYPE = 'above:min value must be defined as an integer'

/**
 * Makes sure the value provided by the end user is above the
 * expected value.
 *
 * Make sure to cast the user input value to `number` before using this
 * rule by using `number` rule.
 *
 * ----
 * const rules = {
 *   age: 'number|above:20'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rules.number(),
 *     rules.above(20)
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args: any[]): number[] {
    ensureLength(args, MISSING_VALUE, 1)
    const minValue = cast(args[0], 'number', INVALID_TYPE) as number
    return [minValue]
  },

  validate: (data, field, [minValue]: ArgComparison, _type, _root, config: RulesConfig): boolean => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || isAbove(fieldValue, minValue)
  },
}

export { validation as default }
