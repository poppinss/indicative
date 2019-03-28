/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable, ensureLength } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'endsWith:make sure to define substring'

/**
 * Ensure the value of field under validation ends with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   reg_no: 'ends_with:qaw'
 * }
 *
 * // or
 * const rules = {
 *   reg_no: [
 *     rule('ends_with', 'qaw')
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

  validate: (data, field, [substring]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || fieldValue.endsWith(substring)
  },
}

export { validation as default }
