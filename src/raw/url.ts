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
 * @description tells whether given input is a valid url
 * or not
 * @method url
 * @param  {String} input
 * @return {Boolean}
 * @example
 *   Following yields to true
 *   http://foo.com
 *   https://foo.com
 *   http://localhost
 *   http://foo.co.in
 */
export default (input: string) => urlRegex.test(input)
