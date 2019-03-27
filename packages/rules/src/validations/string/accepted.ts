/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { truthy } from '../../raw/truthy'
import { RulesConfig } from '../../Contracts'

/**
 * Ensures that the field under validation is accepted.
 * Empty strings, `false`, `null`, `0` and undefined
 * values will be considered as not accepted.
 *
 * [source, js]
 * ----
 * const rules = {
 *   terms: 'accepted'
 * }
 *
 * // or
 * const rules = {
 *   terms: [
 *     rule('accepted')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || truthy(fieldValue)
  },
}

export { validation as default }
