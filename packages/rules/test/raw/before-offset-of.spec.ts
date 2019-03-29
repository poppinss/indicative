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
  subMonths,
  subMilliseconds,
  subWeeks,
  subQuarters,
} from 'date-fns'

test.group('raw | isBeforeOffset', () => {
  test('return true when date is before defined offset', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 13), 12, 'months')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset milliseconds', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMilliseconds(new Date(), 40), 12, 'milliseconds')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset weeks', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subWeeks(new Date(), 2), 1, 'weeks')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset quaters', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subQuarters(new Date(), 2), 1, 'quarters')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset years', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 16), 1, 'years')
    assert.isTrue(isBeforeOffset)
  })

  test('return false when calc unit is invalid', (assert) => {
    const calcUnit = 'foo' as any
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 16), 1, calcUnit)
    assert.isFalse(isBeforeOffset)
  })
})
