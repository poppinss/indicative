/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'
import { isObject } from '../../raw/isObject'
import { RulesConfig } from '../../Contracts'

/**
 * Ensures the value of field under validation is a valid Javascript
 * object.
 *
 * The validation will fail for `Arrays`, though they are objects too in Javascript.
 * ----
 * const rules = {
 *   user: 'object'
 * }
 *
 * // or
 * const rules = {
 *   user: [
 *     rule('object')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || isObject(fieldValue)
  },
}

export { validation as default }
