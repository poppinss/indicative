import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import existy from '../raw/existy'

/**
 * Ensures the value of 2 fields are same.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password_confirmation: 'same:password'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('same', ['password'])
 *   ]
 * }
 * ----
 */
export default (data, field, message, [targetedField], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    const targetedFieldValue = get(data, targetedField)

    if (!skippable(fieldValue) && existy(targetedFieldValue) && targetedFieldValue !== fieldValue) {
      return message
    }
  })
}
