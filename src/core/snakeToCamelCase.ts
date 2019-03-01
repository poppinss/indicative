'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Converts a string from snake case to camel case
 */
export default (str: string): string => {
  return str.replace(/_(\w)/g, (_match, group) => group.toUpperCase())
}
