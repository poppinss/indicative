import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    const targetedFieldValue = get(data, args[0])
    if (!targetedFieldValue) {
      return
    }

    if (targetedFieldValue !== fieldValue) {
      return message
    }
  })
}
