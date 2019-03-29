/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling, if value is an array or not.
 *
 * @example
 * ```
 * const { is } = require('indicative')
 *
 * if (is.array([])) {
 * }
 * ```
 */
export const array = (value: any): boolean => Array.isArray(value)
