import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    let expectedFieldsCount = 0

    /**
     * looping through all items to make sure
     * all of them is present
     */
    args.forEach(function (item) {
      if (get(data, item)) {
        expectedFieldsCount++
      }
    })

    if (expectedFieldsCount === args.length && empty(get(data, field))) {
      return message
    }
  })
}
