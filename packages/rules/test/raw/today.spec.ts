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

test.group('raw | today', () => {
  test('return true when date is today', (assert) => {
    const isToday = Is.today(new Date())
    assert.isTrue(isToday)
  })

  test('return true when date is today and represented as string', (assert) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const todayString = `${year}-${castedMonth}-${castedDay}`

    const isToday = Is.today(todayString)
    assert.isTrue(isToday)
  })
})
