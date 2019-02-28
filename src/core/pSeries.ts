/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { LazyPromiseResultNode } from '../contracts'

/**
 * Returns an object containing enough info about
 * whether the promise has been resolved or not.
 *
 * @method onResolved
 *
 * @param {Mixed} result
 *
 * @returns {Object}
 */
function onResolved (result: any): LazyPromiseResultNode {
  return {
    fullFilled: true,
    rejected: false,
    value: result,
    reason: undefined,
  }
}

/**
 * Returns an object containing enough info whether
 * the promises was rejected or not.
 *
 * @method onRejected
 *
 * @param {Object} error
 *
 * @returns {Object}
 */
function onRejected (error: Error | string): LazyPromiseResultNode {
  return {
    fullFilled: false,
    rejected: true,
    value: null,
    reason: error,
  }
}

/**
 * Here we run an array of promises in sequence until the last
 * promise is finished.
 *
 * When `bail=true`, it will break the chain when first promise returns
 * the error/exception.
 *
 * ## Why serial?
 * Since the validations have to be executed one after the other, the
 * promises execution has to be in sequence
 *
 * ## Why wait for all promises?
 * The `validateAll` method of the library allows to run all validations,
 * even when they fail. So this method handles that too.
 *
 * ## Note
 * This method will never reject, instead returns an array of objects, which
 * has `rejected` and `fullFilled` properties to find whether the promise
 * was rejected or not.
 *
 * @method pSeries
 *
 * @param {Array} iterable
 * @param {Boolean} bail
 *
 * @return {Object[]}  result - Array of objects holding promises results
 * @property {Boolean} result.fullFilled
 * @property {Boolean} result.rejected
 * @property {Mixed}   result.value - Resolved value if fullFilled
 * @property {Mixed}   result.reason - Error value if rejected
 *
 * @example
 * pSeries([p1, p2])
 * .then((result) => {
 *  const errors = result.filter((item) => item.rejected)
 *  if (errors.length) {
 *    console.log(errors)
 *  }
 * })
 *
 * // stopping after first failure
 * pSeries([p1, p2], true)
 * .then((result) => {
 *  const errors = result.filter((item) => item.rejected)
 *  if (errors.length) {
 *    console.log(errors[0])
 *  }
 * })
 */
function pSeries<T> (iterable: Promise<T>[], bail: boolean): Promise<LazyPromiseResultNode[]> {
  const result: LazyPromiseResultNode[] = []
  const iterableLength = iterable.length

  function noop (index: number, bail: boolean) {
    /**
     * End of promises
     */
    if (index >= iterableLength) {
      return Promise.resolve(result)
    }

    return iterable[index]
      .then((output) => {
        result.push(onResolved(output))
        return noop(index + 1, bail)
      })
      .catch((error) => {
        result.push(onRejected(error))

        /**
         *
         *  When bail is false, we continue after rejections
         *  too.
         */
        if (!bail) {
          return noop(index + 1, bail)
        }

        /**
         *  Otherwise we resolve the promise
         */
        return Promise.resolve(result)
      })
  }

  return noop(0, bail)
}

export default pSeries
