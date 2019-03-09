/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'
import { existy } from '../raw'

/**
 * Ensures the value of the field under validation is always different from
 * the targeted field value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   secondary_email: 'different:primary_email'
 * }
 *
 * // or
 * const rules = {
 *   secondary_email: [
 *     rule('different', 'primary_email')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('different: make sure to define target field for comparison')
    }

    return args
  },
  validate: (data, field, [targetField]: [string]) => {
    const fieldValue = data[field]
    const targetFieldValue = data[targetField]
    return skippable(fieldValue) || !existy(targetFieldValue) || targetFieldValue !== fieldValue
  },
}

export { validation as default }
