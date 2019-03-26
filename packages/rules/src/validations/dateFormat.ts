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
import { dateFormat } from '../raw/dateFormat'

/**
 * Ensures the date or date time is valid as the one of the defined formats.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/format[format] method from dateFns.
 *
 * === Note
 * Following steps are performed to strip the timezone from the actual date
 * and then format the date. Keeping timezones on will result in different
 * output, though the format is correct.
 *
 * 1. Timezone is only stripped when the date format expects timezone to
 *    be present.
 * 2. `Z` and `ZZ` identifiers replaces their expected counter parts.
 * 3. Also date can have `Z`, which is equivalent to `+00:00`.
 * 4. If we will not strip the timezone offset from the actual date, then
 *    dateFns will format it in local timezone causing invalid date
 *    comparison.
 * 5. Validation will also fail, when format expects a timezone but missing
 *    in original date.
 *
 * [source, js]
 * ----
 * // always use the rule method
 *
 * const rules = {
 *   publish_at: [
 *     rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('dateFormat: make sure to define atleast one date format')
    }

    return args
  },
  validate: (data, field, args: string[], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || dateFormat(fieldValue, args)
  },
}

export { validation as default }
