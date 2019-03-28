/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { toDate } from './toDate'
import { toNumber } from './toNumber'

export function changeType (value: any, toType: 'number' | 'date', message: string): any {
  /**
   * Correct type
   */
  if (typeof(value) === toType) {
    return value
  }

  if (toType === 'number') {
    const castedValue = toNumber(value)
    if (!castedValue) {
      throw new Error(message)
    }

    return castedValue
  }

  if (toType === 'date') {
    const castedValue = toDate(value)
    if (!castedValue) {
      throw new Error(message)
    }

    return castedValue
  }
}
