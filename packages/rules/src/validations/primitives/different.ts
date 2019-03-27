/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { args as argsValidator, skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { existy } from '../../raw'
import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'different:make sure to define target field for comparison'

/**
 * Ensures the value of the field under validation is always different from
 * the targeted field value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   secondary_email: 'different:primary_email'
 * }
 *
 * // or
 * const rules = {
 *   secondary_email: [
 *     rule('different', 'primary_email')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    return [String(args[0])]
  },

  validate: (data, field, [targetField]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const targetFieldValue = data[targetField]
    return !existy(targetFieldValue) || targetFieldValue !== fieldValue
  },
}

export { validation as default }
