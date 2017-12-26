'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { prop } from 'pope'

/**
 * This method loops over an array and build properties based upon
 * values available inside the data object.
 *
 * This method is supposed to never throw any exceptions, and instead
 * skip a property when data or pairs are not in right format.
 *
 * @method starToIndex
 *
 * @param {Array}  pairs
 * @param {Object} data
 * @param {Number} i
 * @param {Out}    out
 *
 * @example
 * const pairs = ['users', 'username']
 * const data = { users: [ { username: 'foo' }, { username: 'bar' } ] }
 *
 * startToIndex(pairs, data)
 * // output ['users.0.username', 'users.1.username']
 */
function starToIndex (pairs, data, i, out) {
  if (!data) {
    return []
  }

  i = i || 0
  let curr = pairs[i++]
  const next = pairs[i]

  /**
   * When out is not defined, then start
   * with the current node
   */
  if (!out) {
    out = [curr]
    curr = ''
  }

  /**
   *  Keep on adding to the out array. The reason we call reduce
   *  operation, as we have to modify the existing keys inside
   *  the `out` array.
   */
  out = out.reduce((result, existingNode) => {
    const nName = curr ? `${existingNode}.${curr}` : existingNode

    /**
     * We pull childs when `next` is not undefined, otherwise
     * we assume the end of `*` expression
     */
    if (next !== undefined) {
      const value = prop(data, nName)
      if (Array.isArray(value)) {
        const dataLength = value.length
        for (let i = 0; i < dataLength; i++) {
          result.push(`${nName}.${i}`)
        }
      }
    } else {
      result.push(nName)
    }
    return result
  }, [])

  /**
   *  Recursively call this method until we loop through the entire
   *  array.
   */
  return i === pairs.length ? out : starToIndex(pairs, data, i, out)
}

export default starToIndex
