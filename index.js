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
import configure from './src/core/configure'
import config from './src/core/config'

/**
 * Named exports are freezed and hence we need to create
 * a copy, so that it can be extended.
 */
const rawCopy = Object.keys(raw).reduce((result, name) => {
  result[name] = raw[name]
  return result
}, {})

const validationsCopy = Object.keys(validations).reduce((result, name) => {
  result[name] = validations[name]
  return result
}, {})

const sanitizationsCopy = Object.keys(sanitizations).reduce((result, name) => {
  result[name] = sanitizations[name]
  return result
}, {})

export default {
  validate: (...args) => {
    return validator(validationsCopy, config.FORMATTER || formatters.Vanilla).validate(...args)
  },
  validateAll: (...args) => {
    return validator(validationsCopy, config.FORMATTER || formatters.Vanilla).validateAll(...args)
  },
  sanitize: (...args) => {
    return sanitizor(sanitizationsCopy).sanitize(...args)
  },
  is: rawCopy,
  sanitizor: sanitizationsCopy,
  validations: validationsCopy,
  rule,
  formatters,
  configure
}
