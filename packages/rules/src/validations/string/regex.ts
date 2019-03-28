/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable, ensureLength } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { ArgRegex, RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'regex:make sure to define regex pattern'

/**
 * Ensures the value of field under validation, passes the regex test. The regex
 * can be defined as a string or a RegExp object.
 *
 * NOTE: For complex `regex`, always use the `rule` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: [
 *     rule('regex', /[a-z]+/)
 *   ]
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('regex', new RegExp('[a-z]+'))
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): ArgRegex {
    ensureLength(args, MISSING_VALUE, 1)

    const expression = args[0] instanceof RegExp ? args[0] : new RegExp(args[0], args[1])
    return [expression]
  },

  validate: (data, field, [expression]: ArgRegex, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || expression.test(fieldValue)
  },
}

export { validation as default }
