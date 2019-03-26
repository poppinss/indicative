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
import { after } from '../raw/after'
import { ArgComparisonDate, RulesConfig } from '../Contracts'

/**
 * Ensures the value of the field is after the expected
 * date.
 *
 * This method will import link:https://date-fns.org/docs/isAfter[isAfter] function of date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: `after:`${new Date()}
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('after', new Date())
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args: any[]): any[] {
    if (!args[0]) {
      throw new Error('after: make sure to define the after date')
    }

    return args
  },
  validate: (data, field, [comparisonDate]: ArgComparisonDate, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || after(fieldValue, comparisonDate)
  },
}

export { validation as default }
