/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationNode } from 'indicative-compiler'
import { empty } from '../raw/empty'

/**
 * The field is checked for required validation, when expected field value is same
 * as the expected value.
 *
 * `{}`, `[]`, `''`, `null`, `undefined` are considered as empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   state: 'required_when:country,US'
 * }
 *
 * // or
 * const rules = {
 *   state: [
 *     rule('required_when', ['country', 'US'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || args.length < 2) {
      throw new Error('requiredWhen: make sure to define target field and expected value')
    }

    return args
  },
  validate: (data, field, [targetField, expectedValue]: [string, any]) => {
    const otherValue = data[targetField]

    // tslint:disable-next-line:triple-equals
    if (!otherValue || expectedValue !== otherValue) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
