import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import inArray from '../raw/inArray'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (inArray(fieldValue, args)) {
      return message
    }
  })
}
