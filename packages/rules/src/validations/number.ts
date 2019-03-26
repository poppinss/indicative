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
import { isNumber } from '../raw/isNumber'
import { RulesConfig } from '../Contracts'

/**
 * Makes sure that the value of field under validation is a valid
 * number. The validation will pass for floats too, since it uses `typeof` internally.
 *
 * For strict integers, you must use the link:integer[integer] rule.
 *
 * [source, js]
 * ----
 * const rules = {
 *   game_points: 'number'
 * }
 *
 * // or
 * const rules = {
 *   game_points: [
 *     rule('number')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || isNumber(fieldValue, !config.castValues)
  },
}

export { validation as default }
