/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { empty } from '../../raw/empty'

/**
 * Ensures the value of field under validation is not empty. All of the following
 * values will be considered empty.
 *
 * - An empty Object `{}`
 * - Empty Array `[]`
 * - Empty string, `null` or `undefined`
 *
 * ----
 * const rules = {
 *   username: 'required'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rules.required()
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field) => {
    return !empty(data[field])
  },
}

export { validation as default }
