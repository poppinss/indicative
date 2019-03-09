/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { skippable } from '../utils'
import { truthy } from '../raw/truthy'

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
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || truthy(fieldValue)
  },
}

export { validation as default }
