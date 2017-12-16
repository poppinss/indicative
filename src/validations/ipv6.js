import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import ipv6 from '../raw/ipv6'

/**
 * Ensures the value is a valid ip address as per `ipv6` spec only.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ipv6'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ipv6')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !ipv6(fieldValue)) {
      return message
    }
  })
}
