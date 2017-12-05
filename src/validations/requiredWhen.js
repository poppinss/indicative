import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

export default function (data, field, message, [otherField, expectedValue], get) {
  return toPromise(() => {
    const otherValue = get(data, otherField)
    if (!otherValue || expectedValue !== otherValue) {
      return
    }
    if (empty(get(data, field))) {
      return message
    }
  })
}
