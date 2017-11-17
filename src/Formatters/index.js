'use strict'

/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

module.exports = {
  list: new Map(),
  defaultFormatter: null,

  /**
   * Returns the formatter instance using it's name
   *
   * @method get
   *
   * @param  {String} name
   *
   * @return {Object}
   */
  get (name) {
    const Formatter = this.list.get(name || this.defaultFormatter)

    if (!Formatter) {
      throw new Error(`Cannot find formatter for ${name}. Make sure to register it first`)
    }

    return new Formatter()
  },

  /**
   * Set the formatter to be used by default
   *
   * @method default
   *
   * @param  {String} name
   *
   * @chainable
   */
  default (name) {
    this.defaultFormatter = name
  },

  /**
   * Registers a new formatter to the list. Also will override
   * the old one silently if names are same.
   *
   * @method register
   *
   * @param  {String} name
   * @param  {Class} implementation
   *
   * @chainable
   */
  register (name, implementation) {
    if (typeof (implementation) !== 'function' || !implementation.prototype) {
      throw new Error('Make sure to register a valid ES6 class')
    }

    if (typeof (implementation.prototype.addError) !== 'function' || typeof (implementation.prototype.toJSON) !== 'function') {
      throw new Error('Formatter must have {addError} and {toJSON} methods on it')
    }

    this.list.set(name, implementation)
    return this
  }
}
