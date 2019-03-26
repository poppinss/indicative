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
import { RulesConfig } from '../Contracts'

/**
 * Ensure the value of field under validation starts with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   phone_no: 'starts_with:99'
 * }
 *
 * // or
 * const rules = {
 *   phone_no: [
 *     rule('starts_with', '99')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('startsWith: make sure to define substring')
    }
    return args
  },
  validate: (data, field, [substring]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || String(fieldValue).startsWith(substring)
  },
}

export { validation as default }
