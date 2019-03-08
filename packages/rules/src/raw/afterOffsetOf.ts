/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { after } from './after'
import { calcUnits } from '../utils'
import { CalcKeys } from '../contracts'

/**
 * Returns a boolean telling if input date is after
 * the given offset or not
 */
export const afterOffsetOf = (
  input: Date | string | number,
  diffUnit: string | number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '+')
  return expectedDate ? after(input, expectedDate) : false
}
