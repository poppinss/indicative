/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Tells if `input` is greator than `comparsionInput`.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.above(20, 10)) {
 * }
 * ```
 */
export const above = (input: number, comparsionInput: number): boolean => {
  return input > comparsionInput
}
