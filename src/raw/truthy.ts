/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import existy from './existy'

export default (input: any) => existy(input) && input !== false && input !== 0
