/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { addMonths, addDays, addMilliseconds } from 'date-fns'
import { CalcKeys } from '../src/contracts'

const viaMonths = {
  years: (unit: number) => unit * 12,
  quarters: (unit: number) => unit * 3,
  months: (unit: number) => unit,
}

const viaDays = {
  weeks: (unit: number) => unit * 7,
  days: (unit: number) => unit,
}

const viaMilliseconds = {
  hours: (unit: number) => unit * 3600000,
  minutes: (unit: number) => unit * 60000,
  seconds: (unit: number) => unit * 1000,
  milliseconds: (unit: number) => unit,
}

export const skippable = (value: any): boolean => {
  return value === undefined
}

/**
 * The job of this method is to ensure that we pull less dependencies from
 * date-fns.
 */
export const calcUnits = (diffUnit: number | string, key: CalcKeys, operator: string) => {
  diffUnit = Number(diffUnit)

  if (viaMonths[key]) {
    return addMonths(new Date(), operator === '-' ? -viaMonths[key](diffUnit) : viaMonths[key](diffUnit))
  }

  if (viaDays[key]) {
    return addDays(new Date(), operator === '-' ? -viaDays[key](diffUnit) : viaDays[key](diffUnit))
  }

  if (viaMilliseconds[key]) {
    return addMilliseconds(
      new Date(),
      operator === '-' ? -viaMilliseconds[key](diffUnit) : viaMilliseconds[key](diffUnit),
    )
  }
}
