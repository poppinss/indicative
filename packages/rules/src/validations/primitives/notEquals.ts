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

import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'notEquals:make sure to define comparison value'

/**
 * Makes sure that the value of field under validation is not
 * same as the defined value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_equals:root'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_equals', 'root')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    return [args[0]]
  },

  validate: (data, field, [comparisonValue]: [any], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]

    // tslint:disable-next-line:triple-equals
    return skippable(fieldValue, field, config) || comparisonValue != fieldValue
  },
}

export { validation as default }
