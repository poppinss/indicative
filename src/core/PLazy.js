'use strict'

/**
 * This method creates a lazy promise which is only executed
 * when `.then` or `.catch` are called on the PLazy instance.
 *
 * Since this class is used internally and never meant to be
 * used as a public interface, we take the advantage or
 * creating a non-complaint promise constructor.
 *
 * ## NOTE
 * Never use this class in your own code, there are better implementations
 * of lazy promises on npm.
 *
 * @class Plazy
 *
 * @param {Function} fn
 *
 * @example
 * return new PLazy((resolve, reject) => {
 *   // evaluated when .then is called
 * })
 */
function PLazy (fn) {
  this.fn = fn
  this._promise = null
}

PLazy.prototype.then = function (onFulfilled, onRejected) {
  this._promise = this._promise || new Promise(this.fn)
  return this._promise.then(onFulfilled, onRejected)
}

PLazy.prototype.catch = function (onRejected) {
  this._promise = this._promise || new Promise(this.fn)
  return this._promise.catch(onRejected)
}

export default PLazy
