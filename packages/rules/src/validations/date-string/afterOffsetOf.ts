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
import { allowedCalcKeys } from '../../utils'
import { ArgOffset, RulesConfig } from '../../Contracts'
import { afterOffsetOf } from '../../raw/afterOffsetOf'

const MISSING_VALUES = 'afterOffsetOf:make sure to define offset unit and key'
const INVALID_AFTER_KEY = 'afterOffsetOf:2nd argument must be a valid calc key'
const INVALID_AFTER_UNIT = 'afterOffsetOf:1st argument must be a number'

/**
 * Ensures the date is after a given offset of a given
 * time period. The `period` value has to be one of
 * the following
 *
 * - years
 * - quarters
 * - months
 * - weeks
 * - days
 * - hours
 * - minutes
 * - seconds
 * - milliseconds
 *
 * ```js
 * const rules = {
 *   meetup: 'after_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   meetup: [
 *     rules.afterOffsetOf([4, 'months'])
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  compile (args: any[]): any[] {
    argsValidator.ensureLength(args, MISSING_VALUES, 2)
    const diffUnit = argsValidator.changeType(args[0], 'number', INVALID_AFTER_UNIT)
    const key = args[1]

    if (!allowedCalcKeys.includes(key)) {
      throw new Error(INVALID_AFTER_KEY)
    }

    return [Number(diffUnit), key]
  },

  validate: (data, field, [diffUnit, key]: ArgOffset, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || afterOffsetOf(fieldValue, diffUnit, key)
  },
}

export { validation as default }
