import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

export default (data, field, message, args, get) => {
  const targetedValue = args[0]
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (targetedValue == fieldValue) { // eslint-disable-line eqeqeq
      return message
    }
  })
}
