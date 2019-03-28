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
 * Makes sure that the value of field under validation is a valid
 * whole number.
 *
 * Validation fails when number has a negative value. You must use `integer`
 * or `float` rules for that.
 *
 * [casts]
 *  [from label="string"]
 *  [to label="number"]
 * [/casts]
 *
 * ----
 * const rules = {
 *   game_points: 'number'
 * }
 *
 * // or
 * const rules = {
 *   game_points: [
 *     rules.number()
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, root, config: RulesConfig) => {
    let fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    /**
     * Ensure value is castable to number
     */
    const castedValue = cast(fieldValue, 'number')
    if (castedValue === null) {
      return false
    }

    /**
     * Whole numbers must be greater than zero
     */
    if (castedValue < 0) {
      return false
    }

    /**
     * Mutate field value
     */
    patchValue(data, field, castedValue, root)
    return true
  },
}

export { validation as default }
