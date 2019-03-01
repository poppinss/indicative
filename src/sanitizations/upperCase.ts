/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Converts a value to upper case. This sanitization rule is locale aware.
 * If value is not a string, then it will return as is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   hexCode: 'upperCase'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   hexCode: [
 *     rule('upperCase')
 *   ]
 * }
 * ----
 *
 * You may also specify a locale.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   label: 'upperCase:fr-CA'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   label: [
 *     rule('upperCase', 'fr-CA')
 *   ]
 * }
 */
export default<T extends any> (value: T, args?: string | string[]): T => {
  if (typeof value !== 'string') {
    return value
  }

  /**
   * Locale implementation is a draft and may not work
   * in all versions of Node.js
   * https://goo.gl/Uzedkb
   */
  return value.toLocaleUpperCase(args)
}
