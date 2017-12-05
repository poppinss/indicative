import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import between from '../raw/between'

export default (data, field, message, [min, max], get) => {
  return toPromise(() => {
    if (!min || !max) {
      return new Error('min and max values are required for range validation')
    }

    const fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    if (!between(fieldValue, min, max)) {
      return message
    }
  })
}
