/**
 * Remove whitespace from both sides of a given string.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   username: 'trim'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   username: [
 *     rule('trim')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (typeof (value) !== 'string') {
    return value
  }
  return value.trim()
}
