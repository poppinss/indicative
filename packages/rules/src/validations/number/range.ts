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

import { between } from '../../raw/between'
import { RulesConfig, ArgMinMax } from '../../Contracts'

const MISSING_VALUES = 'range:make sure to define min and max values'
const INVALID_TYPE = 'range:min and max values must be defined as integers'

/**
 * Ensures the value of field under validation is under a given range.
 *
 * ```js
 * const rules = {
 *   age: 'range:16,60'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rules.range([16, 60])
 *   ]
 * }
 * ```
 */
const validation: Validation = {
  async: false,

  compile (args): any[] {
    argsValidator.ensureLength(args, MISSING_VALUES, 2)

    const min = argsValidator.changeType(args[0], 'number', INVALID_TYPE)
    const max = argsValidator.changeType(args[1], 'number', INVALID_TYPE)

    return [min, max]
  },

  validate: (data, field, [min, max]: ArgMinMax, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || between(fieldValue, min, max)
  },
}

export { validation as default }
