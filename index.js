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

const validatorInstance = validator(validations, formatters)
const sanitizorInstance = sanitizor(sanitizations)

export default {
  validate: validatorInstance.validate,
  validateAll: validatorInstance.validateAll,
  is: raw,
  sanitize: sanitizorInstance.sanitize.bind(sanitizorInstance),
  sanitizor: sanitizations,
  rule: rule,
  formatters: formatters
}
