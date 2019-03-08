/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i

/**
 * Tells whether given input is a valid url or not
 *
 * @example
 * ```
 *   // Following yields to true
 *   http://foo.com
 *   https://foo.com
 *   http://localhost
 *   http://foo.co.in
 * ```
 */
export const url = (input: string) => urlRegex.test(input)
