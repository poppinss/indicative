/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { empty } from '../raw/empty'
import { existy } from '../raw/existy'

/**
 * Ensures the field is required when all of the other fields has empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'required_without_any:username,account_id'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('required_without_any', ['username', 'account_id'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredWithoutAny: make sure to define one or more target fields')
    }

    return args
  },
  validate: (data, field, args: string[]) => {
    const missingField = args.some((item) => !existy(data[item]))
    if (missingField) {
      return !empty(data[field])
    }

    return true
  },
}

export { validation as default }
