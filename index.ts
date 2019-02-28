'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import validator from './src/core/validator'
import sanitizor from './src/core/sanitizor'
import * as validations from './src/validations'
import * as sanitizations from './src/sanitizations'
import * as raw from './src/raw'
import * as formatters from './src/formatters'
import rule from './src/core/rule'
import { configure } from './src/core/configure'
import { config } from './src/core/config'
import { IndicativeFormatterConstructor, DataNode, RulesNode, MessagesNode } from './src/contracts'

/**
 * Named exports are freezed and hence we need to create
 * a copy, so that it can be extended.
 */
// const rawCopy = Object.keys(raw).reduce((result, name) => {
//   result[name] = raw[name]
//   return result
// }, {})

// const validationsCopy = Object.keys(validations).reduce((result, name) => {
//   result[name] = validations[name]
//   return result
// }, {})

// const sanitizationsCopy = Object.keys(sanitizations).reduce((result, name) => {
//   result[name] = sanitizations[name]
//   return result
// }, {})

export function validate (
  data: DataNode,
  fields: RulesNode,
  messages?: MessagesNode,
  formatter?: IndicativeFormatterConstructor,
) {
  return validator(validations, config.FORMATTER || formatters.Vanilla)
    .validate(data, fields, messages, formatter)
}

export function validateAll (
  data: DataNode,
  fields: RulesNode,
  messages?: MessagesNode,
  formatter?: IndicativeFormatterConstructor,
) {
  return validator(validations, config.FORMATTER || formatters.Vanilla)
    .validateAll(data, fields, messages, formatter)
}

export function sanitize (data, fields) {
  return sanitizor(sanitizations).sanitize(data, fields)
}

export { raw as is }
export { sanitizations as sanitizor }
export { validations }
export { rule }
export { formatters }
export { configure }
