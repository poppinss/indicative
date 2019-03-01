/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Escapes HTML entities. Useful when you want to avoid XSS attacks.
 *
 * This method will only remove `&`, `"`, `'`, `<` and `>` characters. For advance escaping
 * make use of a 3rd party library like link:https://github.com/mathiasbynens/he[he].
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
export default<T extends any> (value: T): T => {
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
