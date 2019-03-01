import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isIp from '../raw/ip'
import { ValidationFn } from '../contracts'

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
const ip: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && !isIp(fieldValue)) {
      return message
    }
  })
}

export { ip as default }
