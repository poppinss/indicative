/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling, if the given value is between `min` and `max`
 * or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.between(10, 5, 20)) {
 * }
 * ```
 */
export const between = (input: number, min: number, max: number): boolean => {
  return (input > min) && (input < max)
}
