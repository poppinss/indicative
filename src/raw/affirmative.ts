/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const affirmations = ['yes', 'true', 'y', 'ok', 'okay']

/**
 *  Returns if the `input` is one of the affirmative keywords.
 *  Below is the list of keywords and are not case-sensitive
 *  except `A`.
 *
 *  - yes
 *  - true
 *  - y
 *  - ok
 *  - okay
 */
export default (input: string): boolean => {
  if (input === 'A') {
    return true
  }

  return affirmations.indexOf(input.toLowerCase()) > -1
}
