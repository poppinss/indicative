/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { ipv6 } from '../raw/ipv6'
import { skippable } from '../utils'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the value is a valid ip address as per `ipv6` spec only.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ipv6'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ipv6')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || ipv6(fieldValue)
  },
}

export { validation as default }
