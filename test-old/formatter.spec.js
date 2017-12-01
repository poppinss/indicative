'use strict'

/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const Formatter = require('../src/Formatters')

test.group('Formatter', (group) => {
  group.beforeEach(() => {
    Formatter.list.clear()
  })

  test('throw exception when formatter is not a class', (assert) => {
    const fn = () => Formatter.register('jsonapi', {})
    assert.throw(fn, 'Make sure to register a valid ES6 class')
  })

  test('throw exception when formatter does not have addError method', (assert) => {
    class JsonApiFormatter {}
    const fn = () => Formatter.register('jsonapi', JsonApiFormatter)
    assert.throw(fn, 'Formatter must have {addError} and {toJSON} methods on it')
  })

  test('throw exception when formatter does not have toJSON method', (assert) => {
    class JsonApiFormatter {
      addError () {}
    }

    const fn = () => Formatter.register('jsonapi', JsonApiFormatter)
    assert.throw(fn, 'Formatter must have {addError} and {toJSON} methods on it')
  })

  test('register a new formatter when it\'s valid', (assert) => {
    class JsonApiFormatter {
      addError () {}
      toJSON () {}
    }
    Formatter.register('jsonapi', JsonApiFormatter)
    assert.deepEqual(Formatter.list.get('jsonapi'), JsonApiFormatter)
  })

  test('register a new formatter when it\'s a valid old school function', (assert) => {
    function JsonApiFormatter () {}
    JsonApiFormatter.prototype.addError = function () {}
    JsonApiFormatter.prototype.toJSON = function () {}

    Formatter.register('jsonapi', JsonApiFormatter)
    assert.deepEqual(Formatter.list.get('jsonapi'), JsonApiFormatter)
  })

  test('get instance of registered formatter back', (assert) => {
    function JsonApiFormatter () {}
    JsonApiFormatter.prototype.addError = function () {}
    JsonApiFormatter.prototype.toJSON = function () {}

    Formatter.register('jsonapi', JsonApiFormatter)
    assert.instanceOf(Formatter.get('jsonapi'), JsonApiFormatter)
  })

  test('throw exception when trying to get non-existing formatter', (assert) => {
    const fn = () => Formatter.get('jsonapi')
    assert.throw(fn, 'Cannot find formatter for jsonapi. Make sure to register it first')
  })

  test('set default formatter', (assert) => {
    Formatter.default('jsonapi')
    assert.equal(Formatter.defaultFormatter, 'jsonapi')
  })

  test('get default formatter instance when name is not defined', (assert) => {
    function JsonApiFormatter () {}
    JsonApiFormatter.prototype.addError = function () {}
    JsonApiFormatter.prototype.toJSON = function () {}

    Formatter.register('jsonapi', JsonApiFormatter)
    Formatter.default('jsonapi')

    assert.instanceOf(Formatter.get(), JsonApiFormatter)
  })
})
