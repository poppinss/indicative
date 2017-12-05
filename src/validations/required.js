import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

export default (data, field, message, args, get) => {
  return toPromise(() => {
    if (empty(get(data, field))) {
      return message
    }
  })
}
