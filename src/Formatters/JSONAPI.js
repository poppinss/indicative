'use strict'

/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Formatter for JSONAPI
 *
 * @class JSONAPIFormatter
 */
class JSONAPIFormatter {
  constructor () {
    this.errors = []
  }

  /**
   * Stores the error
   *
   * @method addError
   *
   * @param  {Object} error
   */
  addError (error) {
    this.errors.push({
      title: error.validation,
      detail: error.message,
      source: {
        pointer: error.field
      }
    })
  }

  /**
   * Returns an array of errors
   *
   * @method toJSON
   *
   * @return {Array}
   */
  toJSON () {
    return {
      errors: this.errors
    }
  }
}

module.exports = JSONAPIFormatter
