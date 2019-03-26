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
import { existy } from '../raw/existy'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the value of 2 fields are same.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password_confirmation: 'same:password'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('same', ['password'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('same: make sure to define comparison field')
    }

    return args
  },
  validate: (data, field, [comparisonField]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    const targetedFieldValue = data[comparisonField]

    return skippable(fieldValue, config) || !existy(targetedFieldValue) || targetedFieldValue === fieldValue
  },
}

export { validation as default }
