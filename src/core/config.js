'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default {
  /**
   * When existy strict is set to `true`, unless `undefined` values will be
   * considered as non-existy.
   *
   * Otherwise `empty strings`, `null` and `undefined` are considered
   * non-existy.
   *
   * @type {Boolean}
   */
  EXISTY_STRICT: false,

  /**
   * The formatter to be used for formatting errors. If this value is `null` at
   * runtime, indicative will use the vanilla formatter.
   *
   * @type {Class|Null}
   */
  FORMATTER: null
}
