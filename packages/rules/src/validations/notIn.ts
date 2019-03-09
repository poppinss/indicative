/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from '../utils'
import { inArray } from '../raw/inArray'
import { ValidationNode } from 'indicative-compiler'

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
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('notIn: make sure to define search collection')
    }

    return args
  },
  validate: (data, field, args) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || !inArray(fieldValue, args)
  },
}

export { validation as default }
