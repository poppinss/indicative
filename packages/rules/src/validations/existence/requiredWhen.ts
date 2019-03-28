/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ensureLength } from 'indicative-utils'
import { Validation } from 'indicative-compiler'
import { empty } from '../../raw/empty'

const MISSING_VALUES = 'requiredWhen:make sure to define target field and it\'s expected value'

/**
 * The field is checked for required validation, when target field value is same
 * as the target value.
 *
 * ----
 * const rules = {
 *   state: 'required_when:country,US'
 * }
 *
 * // or
 * const rules = {
 *   state: [
 *     rules.requiredWhen(['country', 'US'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    ensureLength(args, MISSING_VALUES, 2)
    return [String(args[0]), args[1]]
  },

  validate: (data, field, [targetField, expectedValue]: [string, any]) => {
    const otherValue = data[targetField]

    // tslint:disable-next-line:triple-equals
    if (empty(otherValue) || expectedValue !== otherValue) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
