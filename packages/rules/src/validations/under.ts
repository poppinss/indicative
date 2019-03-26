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
import { ArgComparison, RulesConfig } from '../Contracts'

/**
 * Ensures the value of a field is under a certain value. All values
 * will be casted to `Number`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'under:60'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('age', 60)
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('under: make sure to define max value')
    }

    return [Number(args[0])]
  },
  validate: (data, field, [maxValue]: ArgComparison, _type, _root, config: RulesConfig) => {
    let fieldValue = data[field]
    if (skippable(fieldValue, config)) {
      return true
    }

    fieldValue = config.castValues ? Number(fieldValue) : fieldValue
    return fieldValue < maxValue
  },
}

export { validation as default }
