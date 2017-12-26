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

export default {
  validate: (...args) => {
    return validator(validations, config.FORMATTER || formatters.Vanilla).validate(...args)
  },
  validateAll: (...args) => {
    return validator(validations, config.FORMATTER || formatters.Vanilla).validateAll(...args)
  },
  sanitize: (...args) => {
    return sanitizor(sanitizations).sanitize(...args)
  },
  is: raw,
  sanitizor: sanitizations,
  validations,
  rule,
  formatters,
  configure
}
