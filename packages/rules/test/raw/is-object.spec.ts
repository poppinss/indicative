'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import * as Is from '../../src/raw'

test.group('raw | isObject', () => {
  test('return true when input is an object', (assert) => {
    assert.isTrue(Is.isObject({name: 'virk'}))
  })

  test('return false when input is not a stringify object', (assert) => {
    assert.isFalse(Is.isObject(JSON.stringify({name: 'virk'})))
  })

  test('return false when input is null', (assert) => {
    assert.isFalse(Is.isObject(null))
  })

  test('return false when input is array', (assert) => {
    assert.isFalse(Is.isObject([]))
  })
})
