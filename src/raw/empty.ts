/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import existy from './existy'

/**
 * @description tells whether input is empty or not
 * @method empty
 * @param  {Mixed} input
 * @return {Boolean}
 * @example
 *   Following yield to true
 *    empty({})
 *    empty([])
 *    empty('')
 *    empty(null)
 *    empty(undefined)
 */
export default (input: any): boolean => {
  if (!existy(input)) {
    return true
  }

  if (input instanceof Date) {
    return false
  }

  if (typeof (input) === 'object') {
    return Object.keys(input).length === 0
  }

  return false
}
