import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!Array.isArray(fieldValue)) {
      return message
    }
  })
}
