/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { args as argsValidator, skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { inArray } from '../../raw/inArray'
import { RulesConfig } from '../../Contracts'

const MISSING_VALUE = 'notIn:make sure to define search collection'

/**
 * Makes sure that the value of field under validation is not
 * from one of the defined values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_in:root,admin,super'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_in', ['root', 'admin', 'super'])
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUE, 1)
    return args
  },

  validate: (data, field, args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || !inArray(fieldValue, args)
  },
}

export { validation as default }
