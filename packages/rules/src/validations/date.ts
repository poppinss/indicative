/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { date } from '../raw/date'
import { skippable } from '../utils'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the field under validation is a valid date. The value can be a
 * date object or a valid date string.
 *
 * If value is a string, it will be processed using `new Date(givenString)`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   login_at: 'date'
 * }
 *
 * // or
 * const rules = {
 *   login_at: [
 *     rule('date')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || date(fieldValue, !config.castValues)
  },
}

export { validation as default }
