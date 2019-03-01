/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: any[], superset: any[]) => {
  if (!Array.isArray(input) || !Array.isArray(superset)) {
    return false
  }

  return input.every(element => superset.includes(element))
}
