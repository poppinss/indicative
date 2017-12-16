'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import Pipe from 'haye/dist/haye-pipe'
import ArrayPresenter from 'haye/dist/haye-array-presenter'
import starToIndex from './starToIndex'

/**
 * This method parses the rules object into a new object with
 * expanded field names and transformed rules.
 *
 * ### Expanding fields
 * One can define `*` expression to denote an array of fields
 * to be validated.
 *
 * The `*` expression is expanded based upon the available data.
 * For example
 *
 * ```js
 * const rules = {
 *  'users.*.username': required
 * }
 *
 * // ( users.length = 2 )
 * const data = {
 *  users: [{}, {}]
 * }
 *
 * output = {
 *  'users.0.username' : [{ name: 'required', args: [] }],
 *  'users.1.username' : [{ name: 'required', args: [] }]
 * }
 * ```
 *
 * @param {Object} fields
 * @param {Object} [data = {}]
 *
 * @method parseRules
 *
 * @example
 * ```js
 *  rules = { username: 'required|alpha' }
 *
 *  output = {
 *    username: [{ name: 'required', args: [] }, { name: 'alpha',args: [] }]
 *  }
 * ```
 *
 * @throws {Error} when rules are not defined as a string or pre-expanded array
 */
function parseRules (fields, data) {
  data = data || {}

  return Object.keys(fields).reduce((result, field) => {
    let rules = fields[field]

    /**
     * Strings are passed to haye for further processing
     * and if rules are not an array or a string, then
     * we should blow.
     */
    if (typeof (rules) === 'string') {
      rules = Pipe(rules, new ArrayPresenter())
    } else if (!Array.isArray(rules)) {
      throw new Error('Rules must be defined as a string or an array')
    }

    /**
     * When field name has a star in it, we need to do some heavy
     * lifting and expand the field to dot properties based upon
     * the available data inside the data object.
     */
    if (field.includes('*')) {
      const nodes = field.split(/\.\*\.?/)
      starToIndex(nodes, data).forEach((f) => { result[f] = rules })
    } else {
      result[field] = rules
    }

    return result
  }, {})
}

export default parseRules
