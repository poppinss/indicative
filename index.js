'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/
const Validator = require('./src/Validator')
const SanitizationFilters = require('./src/Sanitization/filters')
const Sanitization = require('./src/Sanitization')

module.exports = {
  validate: Validator.validate,
  validateAll: Validator.validateAll,
  extend: Validator.extend,
  is: Validator.is,
  'is.extend': Validator.is.extend,
  sanitize: Sanitization.sanitize,
  sanitizor: SanitizationFilters
}
