/**
 * Converts a value to lower case. This sanitization rule is locale aware.
 * If value is not a string, then it will return as is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   hexCode: 'lowerCase'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   hexCode: [
 *     rule('lowerCase')
 *   ]
 * }
 * ----
 *
 * You may also specify a locale.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   label: 'lowerCase:fr-CA'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   label: [
 *     rule('lowerCase', 'fr-CA')
 *   ]
 * }
 */
export default (value, args?) => {
  if (typeof value !== 'string') {
    return value
  }

  /**
   * Locale implementation is a draft and may not work
   * in all versions of Node.js
   * https://goo.gl/Uzedkb
   */
  return (value as any).toLocaleLowerCase(args)
}
