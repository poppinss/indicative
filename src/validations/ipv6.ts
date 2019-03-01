import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isIpv6 from '../raw/ipv6'
import { ValidationFn } from '../contracts'

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
const ipv6: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isIpv6(fieldValue)) {
      return message
    }
  })
}

export { ipv6 as default }
