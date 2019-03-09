import { skippable } from '../utils'
import { ip } from '../raw/ip'
import { ValidationNode } from 'indicative-compiler'

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
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || ip(fieldValue)
  },
}

export { validation as default }
