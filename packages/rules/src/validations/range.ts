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
import { isNull } from '../raw/isNull'
import { between } from '../raw/between'
import { RulesConfig, ArgMinMax } from '../Contracts'

/**
 * Ensures the value of field under validation is under a given range. The values will
 * be cased to `Number` automatically.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'range:16,60'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('range', [16, 60])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || args.length < 2) {
      throw new Error('range: make sure to define min and max values')
    }

    const min = isNull(args[0]) ? NaN : Number(args[0])
    const max = isNull(args[1]) ? NaN : Number(args[1])

    if (isNaN(min) || isNaN(max)) {
      throw new Error('range: min and max values must be defined as integers')
    }

    return [min, max]
  },
  validate: (data, field, [min, max]: ArgMinMax, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, config) || between(fieldValue, min, max, !config.castValues)
  },
}

export { validation as default }
