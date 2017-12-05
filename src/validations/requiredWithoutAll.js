import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    let missingFieldsCount = 0

    /**
     * looping through all items to make sure
     * one of them is present
     */
    args.forEach(function (item) {
      if (!get(data, item)) {
        missingFieldsCount++
      }
    })

    if (missingFieldsCount === args.length && empty(get(data, field))) {
      return message
    }
  })
}
