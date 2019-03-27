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

const MISSING_VALUES = 'requiredWithoutAny:make sure to define one or more target fields'

/**
 * Ensures the field is required when all of the other fields has empty values.
 *
 * ----
 * const rules = {
 *   email: 'required_without_any:username,account_id'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rules.requiredWithoutAny(['username', 'account_id'])
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
    const missingField = args.some((item) => !existy(data[item]))
    if (missingField) {
      return !empty(data[field])
    }

    return true
  },
}

export { validation as default }
