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

test.group('raw | json', () => {
  test('return true when input is json', (assert) => {
    assert.isTrue(Is.json(JSON.stringify({name: 'virk'})))
  })

  test('return false when input is an object', (assert) => {
    assert.isFalse(Is.json({name: 'virk'}))
  })

  test('return false when input is null', (assert) => {
    assert.isFalse(Is.json(null))
  })

  test('return false when input is date', (assert) => {
    assert.isFalse(Is.json(new Date()))
  })
})
