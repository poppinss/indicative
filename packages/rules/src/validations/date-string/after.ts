/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable, ensureLength, cast } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { after } from '../../raw/after'
import { ArgComparisonDate, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'after:make sure to define the after date'
const INVALID_TYPE = 'after:after date must be defined as string or date object'

/**
 * Ensures the value of the field is after the expected date.
 * This method uses [isAfter](https://date-fns.org/docs/isAfter) function of date-fns.
 *
 * Validation fails if value is not a string or Date object.
 *
 * ```js
 * const rules = {
 *   confCall: `after:${new Date()}`
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rules.after(new Date())
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  compile (args: any[]): any[] {
    ensureLength(args, MISSING_VALUE, 1)

    const afterDate = cast(args[0], 'date', INVALID_TYPE)
    return [afterDate]
  },

  validate: (data, field, [comparisonDate]: ArgComparisonDate, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || after(fieldValue, comparisonDate)
  },
}

export { validation as default }
