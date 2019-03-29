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

test.group('raw | isFunction', () => {
  test('return true when input is a function', (assert) => {
    assert.isTrue(Is.isFunction(function foo () {}))
  })

  test('return false when input is a string', (assert) => {
    assert.isFalse(Is.isFunction('function () {}'))
  })

  test('return true when input is a native javascript function', (assert) => {
    assert.isTrue(Is.isFunction(global.toString))
  })
})
