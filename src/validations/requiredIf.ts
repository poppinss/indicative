import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import existy from '../raw/existy'

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
export default (data, field, message, args, get) => {
  return toPromise(() => {
    if (existy(get(data, args[0])) && empty(get(data, field))) {
      return message
    }
  })
}
