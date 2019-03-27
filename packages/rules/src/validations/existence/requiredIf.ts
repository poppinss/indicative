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

const MISSING_VALUE = 'requiredIf:make sure to define target field'

/**
 * The field is checked for required validation, when targeted field exists.
 *
 * ----
 * const rules = {
 *   address: 'required_if:needs_delivery'
 * }
 *
 * // or
 * const rules = {
 *   address: [
 *     rules.requiredIf('needs_delivery')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): string[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    return [String(args[0])]
  },

  validate: (data, field, [targetField]: [string]) => {
    if (!existy(data[targetField])) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
