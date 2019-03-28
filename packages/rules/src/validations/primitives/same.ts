/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ensureLength, skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { existy } from '../../raw/existy'
import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'same:make sure to define target field for comparison'

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
    ensureLength(args, MISSING_VALUE, 1)
    return [String(args[0])]
  },

  validate: (data, field, [comparisonField]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const targetedFieldValue = data[comparisonField]
    return !existy(targetedFieldValue) || targetedFieldValue === fieldValue
  },
}

export { validation as default }
