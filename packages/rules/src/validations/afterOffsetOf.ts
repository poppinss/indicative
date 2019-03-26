/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { skippable, allowedCalcKeys } from '../utils'
import { ArgOffset, RulesConfig } from '../Contracts'
import { afterOffsetOf } from '../raw/afterOffsetOf'

/**
 * Ensures the date is after a given offset of a given
 * time period. The `period` can be defined using
 * following properties.
 *
 * [ul-shrinked]
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
 * [source, js]
 * ----
 * const rules = {
 *   meetup: 'after_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   meetup: [
 *     rule('after_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args: any[]): any[] {
    if (!args || args.length < 2) {
      throw new Error('afterOffsetOf: make sure to define offset unit and key')
    }

    if (!allowedCalcKeys.includes(args[1])) {
      throw new Error('afterOffsetOf: 2nd argument must be a valid calc key')
    }

    return [Number(args[0]), args[1]]
  },
  validate: (data, field, [diffUnit, key]: ArgOffset, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || afterOffsetOf(fieldValue, diffUnit, key)
  },
}

export { validation as default }
