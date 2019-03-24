/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { skippable, allowedCalcKeys } from '../utils'
import { beforeOffsetOf } from '../raw/beforeOffsetOf'
import { ArgOffset, RulesConfig } from '../Contracts'

/**
 * Ensures the date is before a given offset of a given
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
 *   confCall: 'before_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || args.length < 2) {
      throw new Error('beforeOffsetOf: make sure to define offset unit and key')
    }

    if (!allowedCalcKeys.includes(args[1])) {
      throw new Error('beforeOffsetOf: 2nd argument must be a valid calc key')
    }

    return [Number(args[0]), args[1]]
  },
  validate: (data, field, [diffUnit, key]: ArgOffset, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || beforeOffsetOf(fieldValue, diffUnit, key)
  },
}

export { validation as default }
