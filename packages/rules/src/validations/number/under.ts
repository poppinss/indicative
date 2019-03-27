/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { args as argsValidator, skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { ArgComparison, RulesConfig } from '../../Contracts'
import { under } from '../../raw/under'

const MISSING_VALUE = 'under:make sure to define max value'
const INVALID_TYPE = 'under:max value must be defined as an integer'

/**
 * Ensures the value provided by the end user is above the
 * expected value.
 *
 * Make sure to cast the user input value to `number` before using this
 * rule by using `number` rule.
 *
 * ----
 * const rules = {
 *   age: 'under:60'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rules.under(60)
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    const minValue = argsValidator.changeType(args[0], 'number', INVALID_TYPE)
    return [minValue]
  },

  validate: (data, field, [maxValue]: ArgComparison, _type, _root, config: RulesConfig) => {
    let fieldValue = data[field]
    return skippable(fieldValue, field, config) || under(fieldValue, maxValue)
  },
}

export { validation as default }
