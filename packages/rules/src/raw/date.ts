/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling if value is a valid Date object or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.date(new Date())) {
 * }
 *
 * // also works for `date-fns` instance
 * if (is.date(dateFns.parse('2018-11-20'))) {
 * }
 * ```
 */
export const date = (input: any): boolean => {
  return input instanceof Date === true
}
