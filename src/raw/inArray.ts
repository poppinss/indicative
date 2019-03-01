/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: any, dict: any[]) => {
  return typeof (dict.indexOf) === 'function'
    ? dict.indexOf(input) > -1
    : false
}
