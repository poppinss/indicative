import addMonths from 'date-fns/add_months'
import addDays from 'date-fns/add_days'
import addMilliseconds from 'date-fns/add_milliseconds'

/**
 * The job of this method is to ensure that we pull less dependencies from
 * date-fns.
 *
 * @param  {Number} diffUnit
 * @param  {String} key
 * @param  {String} operator
 *
 * @return {String|Undefined}
 */
export default (diffUnit, key, operator) => {
  const viaMonths = {
    years: (unit) => unit * 12,
    quarters: (unit) => unit * 3,
    months: (unit) => unit
  }

  const viaDays = {
    weeks: (unit) => unit * 7,
    days: (unit) => unit
  }

  const viaMilliseconds = {
    hours: (unit) => unit * 3600000,
    minutes: (unit) => unit * 60000,
    seconds: (unit) => unit * 1000,
    milliseconds: (unit) => unit
  }

  diffUnit = Number(diffUnit)

  if (viaMonths[key]) {
    return addMonths(new Date(), operator === '-' ? -viaMonths[key](diffUnit) : viaMonths[key](diffUnit))
  }

  if (viaDays[key]) {
    return addDays(new Date(), operator === '-' ? -viaDays[key](diffUnit) : viaDays[key](diffUnit))
  }

  if (viaMilliseconds[key]) {
    return addMilliseconds(new Date(), operator === '-' ? -viaMilliseconds[key](diffUnit) : viaMilliseconds[key](diffUnit))
  }
}
