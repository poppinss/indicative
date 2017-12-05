import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import ipv6 from '../raw/ipv6'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (skippable(fieldValue)) {
      return
    }

    if (!ipv6(fieldValue)) {
      return message
    }
  })
}
