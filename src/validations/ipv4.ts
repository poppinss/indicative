import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isIpv4 from '../raw/ipv4'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value is a valid ip address as per `ipv4` spec only.
 *
 * [source, js]
 * ----
 * const rules = {
 *   ip_address: 'ipv4'
 * }
 *
 * // or
 * const rules = {
 *   ip_address: [
 *     rule('ipv4')
 *   ]
 * }
 * ----
 */
const ipv4: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isIpv4(fieldValue)) {
      return message
    }
  })
}

export { ipv4 as default }
