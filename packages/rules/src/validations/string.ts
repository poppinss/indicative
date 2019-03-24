/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { skippable } from '../utils'
import { isString } from '../raw/isString'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the value is a string
 *
 * [source, js]
 * ----
 * const rules = {
 *   bio: 'string'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('bio', 'string')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || isString(fieldValue)
  },
}

export { validation as default }
