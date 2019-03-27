/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { args as argsValidator } from 'indicative-utils'
import { Validation } from 'indicative-compiler'
import { empty } from '../../raw/empty'
import { existy } from '../../raw/existy'

const MISSING_VALUES = 'requiredWithAny:make sure to define one or more target fields'

/**
 * Ensures the field is required when any of the other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'required_with_any:username,email'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('required_with_any', ['username', 'email'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUES, 1)
    return args.map((arg) => String(arg))
  },

  validate: (data, field, args: string[]) => {
    const matchingField = args.some((item) => existy(data[item]))
    if (!matchingField) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
