/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { before } from './before'
import { calcUnits } from '../utils'
import { CalcKeys } from '../Contracts'

/**
 * Returns a boolean telling if input date is before the given
 * offset or not.
 *
 * The `key` has to be one of the following values.
 *
 * - years
 * - quarters
 * - months
 * - weeks
 * - days
 * - hours
 * - minutes
 * - seconds
 * - milliseconds
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 * const inputDate = new Date().setDate(new Date().getDate() - 11)
 *
 * if (is.beforeOffsetOf(inputDate, 10, 'days')) {
 * }
 * ```
 */
export const beforeOffsetOf = (
  input: Date | string | number,
  diffUnit: number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '-')
  return expectedDate ? before(input, expectedDate) : false
}
