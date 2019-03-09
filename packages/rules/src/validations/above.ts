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
import { ArgComparison } from '../Contracts'
import { above as isAbove } from '../raw/above'
import { config } from '../config'

/**
 * Makes sure the value provided by the end user is above the
 * expected value.
 * This method will wrap both the values inside the `Number` function.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'above:20'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('above', 20)
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args: any[]): number[] {
    if (!args[0]) {
      throw new Error('above:make sure to define minValue')
    }

    return [Number(args[0])]
  },
  validate: (data, field, [minValue]: ArgComparison): boolean => {
    const fieldValue = data[field]
    return skippable(fieldValue) || isAbove(fieldValue, minValue, !config.castValues)
  },
}

export { validation as default }
