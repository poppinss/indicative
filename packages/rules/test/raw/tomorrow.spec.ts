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

test.group('raw | tomorrow', () => {
  test('return true when date is tomorrow and represented as string', (assert) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const tomorrowString = `${year}-${castedMonth}-${castedDay}`
    const isTomorrow = Is.tomorrow(tomorrowString)
    assert.isTrue(isTomorrow)
  })

  test('return false when date is not tomorrow', (assert) => {
    const isTomorrow = Is.tomorrow('2001-11-04')
    assert.isFalse(isTomorrow)
  })
})
