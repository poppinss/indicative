import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import ipv4 from '../raw/ipv4'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!ipv4(fieldValue)) {
      return message
    }
  })
}
