import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import json from '../raw/json'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (skippable(fieldValue)) {
      return
    }

    if (!json(fieldValue)) {
      return message
    }
  })
}
