/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import above from './above'

export default (input: number | string, comparsionInput: number | string): boolean => {
  return !above(input, comparsionInput)
}
