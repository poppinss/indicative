import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import isBeforeOffsetOf from '../raw/beforeOffsetOf'
import { ValidationFn, ArgOffset } from '../contracts'

/**
 * Ensures the date is before a given offset of a given
 * time period. The `period` can be defined using
 * following properties.
 *
 * [ul-shrinked]
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
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
const beforeOffsetOf: ValidationFn = (data, field, message, [ diffUnit, key ]: ArgOffset, get) => {
  return toPromise(() => {
    if (!diffUnit || !key) {
      return new Error('beforeOffsetOf:make sure to define offset unit and key')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isBeforeOffsetOf(fieldValue, diffUnit, key)) {
      return message
    }
  })
}

export { beforeOffsetOf as default }
