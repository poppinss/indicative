import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import isNumber from '../raw/isNumber'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!isNumber(fieldValue)) {
      return message
    }
  })
}
