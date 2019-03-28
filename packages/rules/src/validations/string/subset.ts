/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable, args as argsValidator, casts, patchValue } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { subset } from '../../raw/subset'
import { isString } from '../../raw/isString'
import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'subset:make sure to define subset collection'

/**
 * Ensures the value of a given field is a
 * subset of expected values.
 *
 * [casts]
 *  [from label="string"]
 *  [to label="array"]
 * [/casts]
 *
 * [casts]
 *  [from label="array items"]
 *  [to label="string values"]
 * [/casts]
 *
 * [source, js]
 * ----
 * const rules = {
 *   include: 'subset:foo,bar,baz'
 * }
 *
 * // or
 * const rules = {
 *   include: [
 *     rule('subset', ['foo', 'bar', 'baz'])
 *   ]
 * }
 * ----
 *
 * SUBJECTIVE: PLEASE RE-CHECK (MORE OF A ARRAY RULE)
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    return args.map((arg) => casts.toString(arg))
  },

  validate: (data, field, args, _type, root, config: RulesConfig) => {
    let fieldValue = data[field]
    if (skippable(fieldValue, field, config)) {
      return true
    }

    /**
     * Convert to array if value is a string
     */
    if (isString(fieldValue)) {
      fieldValue = fieldValue.split(',').map((val: string) => val.trim())
    } else if (Array.isArray(fieldValue)) {
      fieldValue = fieldValue.map((value) => casts.toString(value))
    } else {
      return false
    }

    if (!subset(fieldValue, args)) {
      return false
    }

    /**
     * Mutate data field
     */
    patchValue(data, field, fieldValue, root)
    return true
  },
}

export { validation as default }
