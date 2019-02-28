/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as Pipe from 'haye/dist/haye-pipe'
import * as ArrayPresenter from 'haye/dist/haye-array-presenter'
import starToIndex from './starToIndex'

import {
  ParsedRuleNode,
  ParsedRulesNode,
  DataNode,
  RulesNode,
} from '../contracts'

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
 * ```
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
 * @example
 * ```js
 *  rules = { username: 'required|alpha' }
 *
 *  output = {
 *    username: [{ name: 'required', args: [] }, { name: 'alpha',args: [] }]
 *  }
 * ```
 */
function parseRules (fields: RulesNode, data?: DataNode): ParsedRulesNode {
  return Object
    .keys(fields)
    .reduce((result: ParsedRulesNode, field) => {
      const rules = fields[field]
      let parsedRules: ParsedRuleNode[] = []

      /**
       * Strings are passed to haye for further processing
       * and array is considered as pre-parsed rule
       */
      if (typeof (rules) === 'string') {
        parsedRules = Pipe(fields[field], new ArrayPresenter())
      } else if (Array.isArray(rules)) {
        parsedRules = rules
      }

      /**
       * When field name has a star in it, we need to do some heavy
       * lifting and expand the field to dot properties based upon
       * the available data inside the data object.
       */
      if (field.indexOf('*') > -1) {
        const nodes = field.split(/\.\*\.?/)
        starToIndex(nodes, data || {}).forEach((f) => (result[f] = parsedRules))
      } else {
        result[field] = parsedRules
      }

      return result
    }, {})
}

export default parseRules
