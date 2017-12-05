import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

export default (data, field, message, [minValue], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (Number(fieldValue) >= minValue) {
      return message
    }
  })
}
