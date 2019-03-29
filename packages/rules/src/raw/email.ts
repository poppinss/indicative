/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

// email (sources from jsen validator):
// http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i

/**
 * Returns a boolean telling if email is valid as per email regex pattern
 * or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.email('virk@adonisjs.com')) {
 * }
 * ```
 */
export const email = (input: string): boolean => {
  return emailRegex.test(input)
}
