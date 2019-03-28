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
import { existy } from '../../raw/existy'

const MISSING_VALUES = 'requiredWithAll:make sure to define one or more target fields'

/**
 * Ensures the field is required when all other fields have non-empty values.
 *
 * ----
 * const rules = {
 *   tax_id: 'required_with_all:car,house'
 * }
 *
 * // or
 * const rules = {
 *   tax_id: [
 *     rule.requiredWithAll(['car', 'house'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    ensureLength(args, MISSING_VALUES, 1)
    return args.map((arg) => String(arg))
  },

  validate: (data, field, args: string[]) => {
    const missingField = args.some((item) => !existy(data[item]))
    if (missingField) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
