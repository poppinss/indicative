/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { before } from './before'
import { calcUnits } from '../utils'
import { CalcKeys } from '../contracts'

/**
 * Returns a boolean telling if date before the
 * given offset
 */
export const beforeOffsetOf = (
  input: Date | string | number,
  diffUnit: string | number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '-')
  return expectedDate ? before(input, expectedDate) : false
}
