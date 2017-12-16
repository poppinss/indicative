import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

/**
 * Ensures the value of field under validation, passes the regex test. The regex
 * can be defined as a string or a RegExp object.
 *
 * NOTE: For complex `regex`, always use the `rule` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: [
 *     rule('regex', /[a-z]+/)
 *   ]
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('regex', new RegExp('[a-z]+'))
 *   ]
 * }
 * ----
 */
export default (data, field, message, [regexExp, regexFlags], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    const expression = regexExp instanceof RegExp ? regexExp : new RegExp(regexExp, regexFlags)
    if (!skippable(fieldValue) && !expression.test(fieldValue)) {
      return message
    }
  })
}
