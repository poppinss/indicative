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

test.group('raw | yesterday', () => {
  test('return true when date is yesterday and represented as string', (assert) => {
    const date = new Date(new Date().setDate(new Date().getDate() - 1))
    const year = date.getFullYear()

    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const yesterdayString = `${year}-${castedMonth}-${castedDay}`
    const isYesterday = Is.yesterday(yesterdayString)
    assert.isTrue(isYesterday)
  })

  test('return false when date is not yesterday', (assert) => {
    const isYesterday = Is.yesterday('2001-11-02')
    assert.isFalse(isYesterday)
  })
})
