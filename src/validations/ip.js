import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import ip from '../raw/ip'

/**
 * Ensures the value is a valid ip address as per `ipv4` and `ipv6` specs.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ip'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ip')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && !ip(fieldValue)) {
      return message
    }
  })
}
