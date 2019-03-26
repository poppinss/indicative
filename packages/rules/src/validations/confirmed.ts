/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { same } from '../raw/same'
import { skippable } from '../utils'
import { RulesConfig } from '../Contracts'

/**
 * Ensures a field value as confirmed using a `_confirmation` convention. This is
 * mainly used for password confirmation field.
 *
 * For example: If the password field name is `password`, then another field called
 * `password_confirmation` must exist and should have the same value as the actual
 * field.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'confirmed'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('confirmed')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || same(fieldValue, data[`${field}_confirmation`])
  },
}

export { validation as default }
