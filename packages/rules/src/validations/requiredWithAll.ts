/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { empty } from '../raw/empty'
import { existy } from '../raw/existy'

/**
 * Ensures the field is required when all other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   tax_id: 'required_with_all:car,house'
 * }
 *
 * // or
 * const rules = {
 *   tax_id: [
 *     rule('required_with_all', ['car', 'house'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredWithAll: make sure to define one or more target fields')
    }

    return args
  },
  validate: (data, field, args: string[]) => {
    const missingField = args.some((item) => !existy(data[item]))
    if (missingField) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
