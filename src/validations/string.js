import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import isString from '../raw/isString'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!isString(fieldValue)) {
      return message
    }
  })
}
