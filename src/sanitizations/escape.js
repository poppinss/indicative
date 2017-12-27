/**
 * Escapes HTML entities. Useful when you want to avoid XSS attacks.
 *
 * This method will only remove `&`, `"`, `'`, `<` and `>` characters.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'escape'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('escape')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (typeof (value) !== 'string') {
    return value
  }

  return value
    .replace(/&/g, '&amp;') // replace &
    .replace(/"/g, '&quot;') // replace "
    .replace(/'/g, '&#x27;') // replace '
    .replace(/</g, '&lt;') // replace <
    .replace(/>/g, '&gt;') // replace >
}
