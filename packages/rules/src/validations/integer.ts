/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { skippable } from '../utils'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the value is a valid integer. Also string representation of a number
 * will return true.
 *
 * integer(10) // true
 * integer('10') // true
 * integer('foo') // false
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'integer'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('integer')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    let fieldValue = data[field]
    if (skippable(fieldValue, config)) {
      return true
    }

    fieldValue = config.castValues ? Number(fieldValue) : fieldValue
    return Number.isInteger(fieldValue)
  },
}

export { validation as default }
