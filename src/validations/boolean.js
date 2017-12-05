import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import boolean from '../raw/boolean'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    let fieldValue = get(data, field)
    if (skippable(fieldValue)) {
      return
    }

    /**
     * converting 0 and 1 strings to numbers
     */
    if (fieldValue === '0') {
      fieldValue = 0
    } else if (fieldValue === '1') {
      fieldValue = 1
    }

    if (!boolean(fieldValue)) {
      return message
    }
  })
}
