/**
 * Converts value to an integer using `parseInt`.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   age: 'to_int'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   age: [
 *     rule('to_int')
 *   ]
 * }
 * ----
 */
export default (value, args?) => {
  const radix = Array.isArray(args) && args[0] ? args[0] : 10
  return parseInt(value, radix)
}
