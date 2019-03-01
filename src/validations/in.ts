import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import inArray from '../raw/inArray'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of a given field matches one of expected values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   post_type: 'in:draft,published'
 * }
 *
 * // or
 * const rules = {
 *   post_type: [
 *     rule('in', ['draft', 'published'])
 *   ]
 * }
 * ----
 */
const oneOf: ValidationFn = (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !inArray(fieldValue, args)) {
      return message
    }
  })
}

export { oneOf as default }
