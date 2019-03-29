/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const alphaNumericRegex = /^[a-z0-9]+$/i

/**
 * Returns a boolean telling if value pass the alpha numeric test or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.alphaNumeric('secret123')) {
 * }
 * ```
 */
export const alphaNumeric = (input: any): boolean => {
  return typeof(input) === 'string' && alphaNumericRegex.test(input)
}
