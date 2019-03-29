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

test.group('raw | subset', () => {
  test('return true when input is a subset of another array', (assert) => {
    assert.isTrue(Is.subset(['foo', 'qux', 'baz'], ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']))
  })

  test('return false when input is not a subset of another array', (assert) => {
    assert.isFalse(Is.subset(
      ['foo', 'wubba', 'lubba', 'dub'],
      ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz'],
    ))
  })

  test('return true when input is an empty array', (assert) => {
    assert.isTrue(Is.subset([], ['foo', 'bar', 'baz']))
  })

  test('return false when any of inputs are not array', (assert) => {
    assert.isFalse(Is.subset(({} as any), ['foo', 'bar', 'baz']))
    assert.isFalse(Is.subset(['foo'], {} as any))
  })
})
