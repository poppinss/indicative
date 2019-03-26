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
 * Ensures 2 values are lossely same. This validation will not check for the same type, but
 * instead checks for the same value.
 *
 * Since HTTP request data is always a string, it is better not to perform type checks on it.
 *
 * [source, js]
 * ----
 * const rules = {
 *   coupon: 'equals:5050'
 * }
 *
 * // or
 * const rules = {
 *   coupon: [
 *     rule('equals', 5050)
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('equals: make sure to define the comparison string')
    }

    return args
  },
  validate: (data, field, [comparisonValue]: [string], _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]

    // tslint:disable-next-line:triple-equals
    return skippable(fieldValue, config) || comparisonValue == fieldValue
  },
}

export { validation as default }
