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

import { before } from '../../raw/before'
import { ArgComparisonDate, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'before:make sure to define the before date'
const INVALID_TYPE = 'before:before date must be defined as string or date object'

/**
 * Ensures the value of the field is before the expected date.
 * This method uses [isBefore](https://date-fns.org/docs/isBefore) function of date-fns.
 *
 * Validation fails if value is not a string or Date object.
 *
 * ```js
 * const rules = {
 *   confCall: 'before:2018-11-20'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rules.before(new Date().setDate(new Date().getMonth() + 12))
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  compile (args: any[]): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)

    const beforeDate = argsValidator.changeType(args[0], 'date', INVALID_TYPE)
    return [beforeDate]
  },

  validate: (data, field, [beforeDate]: ArgComparisonDate, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || before(fieldValue, beforeDate)
  },
}

export { validation as default }
