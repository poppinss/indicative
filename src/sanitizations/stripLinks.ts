/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const linksRegex = /<a\b[^>]*>(.*?)<\/a>/g

/**
 * Strips `a` tags from a given string.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_links'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_links')
 *   ]
 * }
 * ----
 */
export default<T extends any> (value: T): T => {
  if (typeof (value) !== 'string') {
    return value
  }

  return value.replace(linksRegex, (_match: string, group: string) => group.trim())
}
