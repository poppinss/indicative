import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import between from '../raw/between'
import isNull from '../raw/isNull'

/**
 * Ensures the value of field under validation is under a given range. The values will
 * be cased to `Number` automatically.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'range:16,60'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('range', [16, 60])
 *   ]
 * }
 * ----
 */
export default (data, field, message, [min, max], get) => {
  return toPromise(() => {
    if ([min, max].some(value => isNull(value) || isNaN(value))) {
      return new Error('range:min and max values are required for range validation')
    }

    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && !between(fieldValue, min, max)) {
      return message
    }
  })
}
