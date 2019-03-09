/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Converts value to an integer using `parseInt`.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   age: 'to_int'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   age: [
 *     rule('to_int')
 *   ]
 * }
 * ----
 */
export const toInt = (value: any, [radix]: [number] = [10]): number => {
  return parseInt(value, radix)
}
