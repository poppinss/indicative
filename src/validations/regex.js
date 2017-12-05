import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

export default (data, field, message, [regexExp, regexFlags], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (skippable(fieldValue)) {
      return
    }

    const expression = regexExp instanceof RegExp ? regexExp : new RegExp(regexExp, regexFlags)
    if (!expression.test(fieldValue)) {
      return message
    }
  })
}
