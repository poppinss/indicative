/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Exports [isAfter](https://date-fns.org/v1.30.1/docs/isAfter) function from `date-fns`. So
 * make sure to check their docs.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * const date = new Date(1989, 6, 10)
 * const comparisonDate = new Date(1987, 1, 11)
 *
 * if (is.after(date, comparisonDate)) {
 * }
 * ```
 */
export { isAfter as after } from 'date-fns'
