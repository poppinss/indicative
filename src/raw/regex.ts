/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: string, regex: RegExp) => {
  if (regex instanceof RegExp === false) {
    throw new Error('You must pass regex as the 2nd argument')
  }

  return regex.test(input)
}
