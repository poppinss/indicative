/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const alphaRegex = /^[a-z]+$/i

/**
 * Returns a boolean telling if value pass the alpha test or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.alpha('hello')) {
 * }
 * ```
 */
export const alpha = (input: any): boolean => {
  return typeof(input) === 'string' && alphaRegex.test(input)
}
