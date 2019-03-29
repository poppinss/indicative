/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const affirmations = ['yes', 'true', 'y', 'ok', 'okay', true]

/**
 *  Returns if the `input` is one of the affirmative keywords.
 *  Below is the list of case insensitive keywords except `A`.
 *
 *  - 'yes'
 *  - 'true', treu
 *  - 'y'
 *  - 'ok'
 *  - 'okay'
 *  - 'A'
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.affirmative('y')) {
 * }
 * ```
 */
export const affirmative = (input: string | boolean): boolean => {
  if (input === 'A' || input === true) {
    return true
  }

  return affirmations.indexOf((input as string).toLowerCase()) > -1
}
