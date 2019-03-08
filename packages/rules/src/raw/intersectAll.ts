/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export const intersectAll = (input: any[], intersectionArray: any[]): boolean => {
  if (!Array.isArray(input) || !Array.isArray(intersectionArray)) {
    return false
  }

  return input.filter((n) => intersectionArray.indexOf(n) > -1).length === input.length
}
