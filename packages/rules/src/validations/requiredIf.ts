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
 * The field is checked for required validation, when expected field exists.
 *
 * [source, js]
 * ----
 * const rules = {
 *   address: 'required_if:needs_delivery'
 * }
 *
 * // or
 * const rules = {
 *   address: [
 *     rule('required_if', 'needs_delivery')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredIf: make sure to define target field')
    }

    return args
  },
  validate: (data, field, [targetField]: [string]) => {
    if (!existy(data[targetField])) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
