/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isBefore from './before'
import { CalcKeys } from '../contracts'
import calcUnits from '../../lib/calcUnits'

/**
 * Returns a boolean telling if date before the
 * given offset
 */
export default (
  input: Date | string | number,
  diffUnit: string | number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '-')
  return expectedDate ? isBefore(input, expectedDate) : false
}
