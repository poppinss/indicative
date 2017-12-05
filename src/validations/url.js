import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import url from '../raw/url'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (skippable(fieldValue)) {
      return
    }

    if (!url(fieldValue)) {
      return message
    }
  })
}
