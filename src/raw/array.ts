/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling, if value is an array. It
 * simply uses `Array.isArray` behind the scenes.
 */
export default (value: any): boolean => Array.isArray(value)
