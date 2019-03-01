/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: any): boolean => {
  try {
    const output = JSON.parse(input) || {}
    return !!output
  } catch (e) {
    return false
  }
}
