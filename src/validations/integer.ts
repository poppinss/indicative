import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value is a valid integer. Also string representation of a number
 * will return true.
 *
 * integer(10) // true
 * integer('10') // true
 * integer('foo') // false
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'integer'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('integer')
 *   ]
 * }
 * ----
 */
const integer: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !Number.isInteger(Number(fieldValue))) {
      return message
    }
  })
}

export { integer as default }
