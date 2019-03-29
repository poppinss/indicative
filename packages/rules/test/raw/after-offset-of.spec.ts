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

import {
  addMonths,
  addDays,
  addMinutes,
  addSeconds,
  addHours,
} from 'date-fns'

test.group('raw | afterOffsetOf', () => {
  test('return false when date is not after defined offset', (assert) => {
    assert.isFalse(Is.afterOffsetOf(new Date(), 12, 'months'))
  })

  test('return true when date is after defined offset months', (assert) => {
    assert.isTrue(Is.afterOffsetOf(addMonths(new Date(), 13), 12, 'months'))
  })

  test('return true when date is after defined offset days', (assert) => {
    assert.isTrue(Is.afterOffsetOf(addDays(new Date(), 2), 1, 'days'))
  })

  test('return true when date is after defined offset minutes', (assert) => {
    assert.isTrue(Is.afterOffsetOf(addMinutes(new Date(), 30), 20, 'minutes'))
  })

  test('return true when date is after defined offset seconds', (assert) => {
    assert.isTrue(Is.afterOffsetOf(addSeconds(new Date(), 30), 20, 'seconds'))
  })

  test('return true when date is after defined offset hours', (assert) => {
    assert.isTrue(Is.afterOffsetOf(addHours(new Date(), 10), 9, 'hours'))
  })

  test('return false when calc unit is invalid', (assert) => {
    const calcUnit = 'foo' as any
    assert.isFalse(Is.afterOffsetOf(addHours(new Date(), 10), 9, calcUnit))
  })

  test('return false when date is not before defined offset', (assert) => {
    assert.isFalse(Is.beforeOffsetOf(new Date(), 12, 'months'))
  })
})
