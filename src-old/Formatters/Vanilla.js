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
 * Mimimal formatter that returns the errors as it is.
 *
 * @class VanillaFormatter
 */
class VanillaFormatter {
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
    this.errors.push(error)
  }

  /**
   * Returns an array of errors
   *
   * @method toJSON
   *
   * @return {Array}
   */
  toJSON () {
    return this.errors
  }
}

module.exports = VanillaFormatter
