/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Since haye pipe expression cannot allow all the keywords, this
 * method helps in defining rules in a raw format.
 *
 * ## Note
 * When using `rule` method, you cannot make use of string expression
 * for that field. However, you can mix both for different fields.
 *
 * @param  {String}              name
 * @param  {Array|String|Number} args
 * @return {Object}
 *
 * @example
 * {
 *   username: [
 *    rule('required'),
 *    rule('alpha')
 *   ],
 *   email: 'email'
 * }
 */
function rule (name, args) {
  return { name, args: !args ? [] : (Array.isArray(args) ? args : [args]) }
}

export default rule
