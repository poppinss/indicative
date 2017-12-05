'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
const Validator = require('./src-old/Validator')
const Sanitization = require('./src-old/Sanitization')
const Formatters = require('./src-old/Formatters')
const Rule = require('./src-old/Rule')

Formatters.register('vanilla', require('./src-old/Formatters/Vanilla'))
Formatters.register('jsonapi', require('./src-old/Formatters/JSONAPI'))
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
