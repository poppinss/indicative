/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from '../utils'
import { boolean } from '../raw/boolean'
import { ValidationNode } from 'indicative-compiler'
import { config } from '../config'

/**
 * Ensures the value of a field is a boolean. Also it will cast following
 * strings to their boolean counter parts.
 *
 * [source, plain]
 * ----
 * '0' -> 0
 * '1' -> 1
 * 'true' -> true
 * 'false' -> false
 * ----
 *
 * [source, js]
 * ----
 * const rules = {
 *   remember_me: 'boolean'
 * }
 *
 * // or
 * const rules = {
 *   remember_me: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || boolean(fieldValue, !config.castValues)
  },
}

export { validation as default }
