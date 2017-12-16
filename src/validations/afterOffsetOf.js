import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import afterOffsetOf from '../raw/afterOffsetOf'

/**
 * Ensures the date is after a given offset of a given
 * time period. The `period` can be defined using
 * following properties.
 *
 * 1. years
 * 2. quarters
 * 3. months
 * 4. weeks
 * 5. days
 * 6. hours
 * 7. minutes
 * 8. seconds
 * 9. milliseconds
 *
 * [source, js]
 * ----
 * const rules = {
 *   meetup: 'after_offset_of:4,months'
 * }
 *
 * // or
 * const rules = {
 *   meetup: [
 *     rule('after_offset_of', [4, 'months'])
 *   ]
 * }
 * ----
 */
export default (data, field, message, [diffUnit, key], get) => {
  return toPromise(() => {
    if (!diffUnit || !key) {
      return new Error('afterOffsetOf:make sure to define offset unit and key')
    }
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !afterOffsetOf(fieldValue, diffUnit, key)) {
      return message
    }
  })
}
