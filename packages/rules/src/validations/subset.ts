/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Validation } from 'indicative-compiler'
import { skippable } from '../utils'
import { subset } from '../raw/subset'
import { isString } from '../raw/isString'
import { RulesConfig } from '../Contracts'

/**
 * Ensures the value of a given field is a
 * subset of expected values.
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
 */
const validation: Validation = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('subset: make sure to define subset collection')
    }

    return args
  },
  validate: (data, field, args, _type, _root, config: RulesConfig) => {
    let fieldValue = data[field]

    if (isString(fieldValue)) {
      fieldValue = fieldValue.split(',').map((val: string) => val.trim())
    }

    return skippable(fieldValue, config) || subset(fieldValue, args)
  },
}

export { validation as default }
