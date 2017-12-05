import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import email from '../raw/email'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!email(fieldValue)) {
      return message
    }
  })
}
