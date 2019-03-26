/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { skippable } from '../utils'
import { before } from '../raw/before'
import { ArgComparisonDate, RulesConfig } from '../Contracts'

/**
 * Ensures the value of field under validation is before a given
 * date.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/isBefore[isBefore] method from date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before:2018-11-20'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before', new Date().setDate(new Date().getMonth() + 12))
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args: any[]): any[] {
    if (!args || !args.length) {
      throw new Error('before: make sure to define the before date')
    }

    return args
  },
  validate: (data, field, [beforeDate]: ArgComparisonDate, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || before(fieldValue, beforeDate)
  },
}

export { validation as default }
