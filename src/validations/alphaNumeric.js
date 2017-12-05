import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import alphaNumeric from '../raw/alphaNumeric'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (skippable(fieldValue)) {
      return
    }

    if (!alphaNumeric(fieldValue)) {
      return message
    }
  })
}
