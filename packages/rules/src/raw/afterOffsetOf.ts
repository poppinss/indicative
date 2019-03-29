/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { after } from './after'
import { calcUnits } from '../utils'
import { CalcKeys, ArgComparisonDate } from '../Contracts'

/**
 * Returns a boolean telling if input date is after the given
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
 *
 * if (is.afterOffsetOf(new Date(), 10, 'days')) {
 * }
 * ```
 */
export const afterOffsetOf = (
  input: ArgComparisonDate[0],
  diffUnit: number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '+')
  return expectedDate ? after(input, expectedDate) : false
}
