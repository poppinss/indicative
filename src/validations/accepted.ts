import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import truthy from '../raw/truthy'
import { ValidationFn } from '../contracts'

/**
 * Ensures that the field under validation is accepted.
 * Empty strings, `false`, `null`, `0` and undefined
 * values will be considered as not accepted.
 *
 * [source, js]
 * ----
 * const rules = {
 *   terms: 'accepted'
 * }
 *
 * // or
 * const rules = {
 *   terms: [
 *     rule('accepted')
 *   ]
 * }
 * ----
 */
const accepted: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !truthy(fieldValue)) {
      return message
    }
  })
}

export { accepted as default }
