import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import ip from '../raw/ip'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!ip(fieldValue)) {
      return message
    }
  })
}
