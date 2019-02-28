import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'

/**
 * Ensures the value of a field is under a certain value. All values
 * will be casted to `Number`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'under:60'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('age', 60)
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const maxValue = args[0]

    if (!maxValue) {
      throw new Error('under:make sure to pass the max value')
    }
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && Number(fieldValue) >= Number(maxValue)) {
      return message
    }
  })
}
