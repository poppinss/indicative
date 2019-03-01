/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: any): boolean => {
  if (typeof (input) === 'string') {
    return input.trim().length > 0
  }

  return (input !== null && input !== undefined)
}
