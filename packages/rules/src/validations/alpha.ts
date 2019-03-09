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
import { alpha } from '../raw/alpha'

/**
 * Makes sure the field under validation is alpha only. The regex used is `/^[a-z]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || alpha(fieldValue)
  },
}

export { validation as default }
