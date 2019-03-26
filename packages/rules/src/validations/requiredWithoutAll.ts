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
 * Ensures the field is required when all of the other fields has empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   zipcode: 'required_without_all:address,state'
 * }
 *
 * // or
 * const rules = {
 *   zipcode: [
 *     rule('required_without_all', ['address', 'state'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredWithoutAll: make sure to define one or more target fields')
    }

    return args
  },
  validate: (data, field, args: string[]) => {
    const hasAnyField = args.some((item) => existy(data[item]))
    if (hasAnyField) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
