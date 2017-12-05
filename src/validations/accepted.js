import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import truthy from '../raw/truthy'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!truthy(fieldValue)) {
      return message
    }
  })
}
