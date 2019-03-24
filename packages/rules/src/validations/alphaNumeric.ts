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
import { RulesConfig } from '../Contracts'
import { alphaNumeric } from '../raw/alphaNumeric'

/**
 * Makes sure the field under validation is alpha numeric only.
 * The regex used is `/^[a-z0-9]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha_numeric'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha_numeric')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || alphaNumeric(fieldValue)
  },
}

export { validation as default }
