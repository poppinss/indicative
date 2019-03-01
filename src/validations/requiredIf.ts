import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import existy from '../raw/existy'
import { ValidationFn } from '../contracts'

/**
 * The field is checked for required validation, when expected field exists.
 *
 * [source, js]
 * ----
 * const rules = {
 *   address: 'required_if:needs_delivery'
 * }
 *
 * // or
 * const rules = {
 *   address: [
 *     rule('required_if', 'needs_delivery')
 *   ]
 * }
 * ----
 */
const requiredIf: ValidationFn = (data, field, message, [targetedField]: [string], get) => {
  return toPromise(() => {
    if (existy(get(data, targetedField)) && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredIf as default }
