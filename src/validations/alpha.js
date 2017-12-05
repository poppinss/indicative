import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import alpha from '../raw/alpha'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!alpha(fieldValue)) {
      return message
    }
  })
}
