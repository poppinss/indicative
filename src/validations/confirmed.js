import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import same from '../raw/same'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }
    if (!same(fieldValue, get(data, `${field}_confirmation`))) {
      return message
    }
  })
}
