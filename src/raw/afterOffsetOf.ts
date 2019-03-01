/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isAfter from './after'
import calcUnits from '../../lib/calcUnits'
import { CalcKeys } from '../contracts'

/**
 * Returns a boolean telling if input date is after
 * the given offset or not
 */
export default (
  input: Date | string | number,
  diffUnit: string | number,
  key: CalcKeys,
): boolean => {
  const expectedDate = calcUnits(diffUnit, key, '+')
  return expectedDate ? isAfter(input, expectedDate) : false
}
