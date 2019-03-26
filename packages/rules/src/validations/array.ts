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
import { RulesConfig } from '../Contracts'

/**
 * Ensure the value is a valid array. Also this validation will never
 * validate the size of array.
 *
 * [source, js]
 * ----
 * const rules = {
 *   whiteListedUrls: 'array'
 * }
 *
 * // or
 * const rules = {
 *   whiteListedUrls: [
 *     rule('array')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || Array.isArray(fieldValue)
  },
}

export { validation as default }
