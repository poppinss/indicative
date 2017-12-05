import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import isObject from '../raw/isObject'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!isObject(fieldValue)) {
      return message
    }
  })
}
