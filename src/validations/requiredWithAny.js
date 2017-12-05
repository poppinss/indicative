import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    let hasExpectedField = false

    /**
     * looping through all items to make sure
     * one of them is present
     */
    for (let i = 0; i < args.length; i++) {
      if (get(data, args[i])) {
        hasExpectedField = true
        break
      }
    }

    if (hasExpectedField && empty(get(data, field))) {
      return message
    }
  })
}
