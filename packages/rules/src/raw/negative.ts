/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { positive } from './positive'
export const negative = (input: string | number, strict: boolean = false) => {
  return !positive(input, strict)
}
