/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { cast, skippable, patchValue } from 'indicative-utils'
import { Validation } from 'indicative-compiler'
import { RulesConfig } from '../../Contracts'

/**
 * Ensures the field under validation is a valid date. The value can be a
 * date object or a valid date string.
 *
 * Returns false when value is not a string or date.
 *
 * [casts]
 *  [from label="string"]
 *  [to label="date"]
 * [/casts]
 *
 * Following is the list of supported formats
 *
 * - 2015-03-25  (ISO Date)
 * - 03/25/2015  (Short Date)
 * - Mar 25 2015 (Long Date)
 * - 25 Mar 2015 (Long Date)
 *
 * ```js
 * const rules = {
 *   login_at: 'date'
 * }
 *
 * // or
 * const rules = {
 *   login_at: [
 *     rules.date()
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const castedValue = cast(fieldValue, 'date')
    if (castedValue === null) {
      return false
    }

    patchValue(data, field, castedValue, root)
    return true
  },
}

export { validation as default }
