/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable, casts } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { same } from '../../raw/same'
import { RulesConfig } from '../../Contracts'

function castType (input: any, type: string): any {
  if (type === 'string') {
    return String(input)
  }

  if (type === 'number') {
    return casts.toNumber(input)
  }

  return input
}

/**
 * Ensures a field value as confirmed using a `_confirmation` convention. This is
 * mainly used for password confirmation field.
 *
 * For example: If the password field name is `password`, then another field called
 * `password_confirmation` must exist and should have the same value as the actual
 * field.
 *
 * ----
 * const rules = {
 *   password: 'confirmed'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rules.confirmed()
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    const valueType = typeof (fieldValue)
    let comparisonValue = data[`${field}_confirmation`]

    /**
     * Cast type of comparison value when types are different. This is important
     * since the end-user is no way to cast type of confirmed field. For example:
     *
     * 1. Add `number` rule to the `pincode` field, which will cast the pincode to `number`.
     * 2. Also add `confirmed` rule to `pincode`, now you cannot cast it's value, so we
     *    need to do type conversion here.
     */
    if (typeof (comparisonValue) !== valueType) {
      comparisonValue = castType(comparisonValue, valueType)
    }

    return same(fieldValue, comparisonValue)
  },
}

export { validation as default }
