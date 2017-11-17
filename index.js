'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
const Validator = require('./src/Validator')
const Sanitization = require('./src/Sanitization')
const Formatters = require('./src/Formatters')
const Rule = require('./src/Rule')

Formatters.register('vanilla', require('./src/Formatters/Vanilla'))
Formatters.register('jsonapi', require('./src/Formatters/JSONAPI'))
Formatters.default('vanilla')

module.exports = {
  validate: Validator.validate,
  validateAll: Validator.validateAll,
  extend: Validator.extend,
  is: Validator.is,
  'is.extend': Validator.is.extend,
  sanitize: Sanitization.sanitize,
  sanitizor: Sanitization.sanitizor,
  rule: Rule,
  'sanitizor.extend': Sanitization.sanitizor.extend,
  formatters: Formatters
}
