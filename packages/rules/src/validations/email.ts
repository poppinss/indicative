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
import { email } from '../raw/email'
import { EmailValidationOptions, RulesConfig } from '../Contracts'

/**
 * Ensures the field under validation is a valid email format.
 *
 * NOTE: This validation never checks for the existence of the email address.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'email'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('email')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field, [options]: [Partial<EmailValidationOptions>], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || email(fieldValue, options)
  },
}

export { validation as default }
