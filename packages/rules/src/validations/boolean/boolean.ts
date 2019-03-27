/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { casts, skippable } from 'indicative-utils'

import { RulesConfig } from '../../Contracts'

/**
 * Ensures the value of a field is a valid boolean representation.
 *
 * Validation fails, if value isn't a boolean and also unable to
 * cast value to boolean.
 *
 * [casts]
 *  [from label="string ('0')"]
 *  [to label="boolean (false)"]
 * [/casts]
 *
 * [casts]
 *  [from label="string ('1')"]
 *  [to label="boolean (true)"]
 * [/casts]
 *
 * [casts]
 *  [from label="string ('false')"]
 *  [to label="boolean (false)"]
 * [/casts]
 *
 * [casts]
 *  [from label="string ('true')"]
 *  [to label="boolean (true)"]
 * [/casts]
 *
 * [casts]
 *  [from label="number (0)"]
 *  [to label="boolean (false)"]
 * [/casts]
 *
 * [casts]
 *  [from label="number (1)"]
 *  [to label="boolean (true)"]
 * [/casts]
 *
 * ```js
 * const rules = {
 *   remember_me: 'boolean'
 * }
 *
 * // or
 * const rules = {
 *   remember_me: [
 *     rules.boolean()
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const castedValue = casts.toBoolean(fieldValue)
    if (castedValue === null) {
      return false
    }

    data[field] = castedValue
    return true
  },
}

export { validation as default }
