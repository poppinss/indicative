/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ipv4 } from './ipv4'
import { ipv6 } from './ipv6'

export const ip = (input: string): boolean => ipv4(input) || ipv6(input)
