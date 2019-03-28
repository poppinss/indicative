/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { toBoolean } from '../src/toBoolean'
import { toDate } from '../src/toDate'
import { toInt } from '../src/toInt'
import { toNumber } from '../src/toNumber'
import { toString } from '../src/toString'

test.group('toBoolean', () => {
  test('return boolean values as it is', (assert) => {
    assert.isFalse(toBoolean(false))
    assert.isTrue(toBoolean(true))
  })

  test('return string counterparts as boolean', (assert) => {
    assert.isFalse(toBoolean('false'))
    assert.isTrue(toBoolean('true'))
  })

  test('return number counterparts as boolean', (assert) => {
    assert.isFalse(toBoolean(0))
    assert.isTrue(toBoolean(1))
  })

  test('return string number counterparts as boolean', (assert) => {
    assert.isFalse(toBoolean('0'))
    assert.isTrue(toBoolean('1'))
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(toBoolean({}))
    assert.isNull(toBoolean([]))
    assert.isNull(toBoolean(null))
    assert.isNull(toBoolean(undefined))
    assert.isNull(toBoolean(10))
    assert.isNull(toBoolean('hello'))
  })
})

test.group('toDate', () => {
  test('return dates as it is', (assert) => {
    const today = new Date()
    assert.equal(toDate(today), today)
  })

  test('return string counterparts as dates', (assert) => {
    const today = new Date()
    assert.equal(toDate(today.toString())!.toString(), today.toString())
  })

  test('return invalid string counterparts as null', (assert) => {
    assert.isNull(toDate('hello'))
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(toDate('hello'))
    assert.isNull(toDate({}))
    assert.isNull(toDate([]))
    assert.isNull(toDate(null))
    assert.isNull(toDate(undefined))
    assert.isNull(toDate(10))
    assert.isNull(toDate(true))
  })
})

test.group('toInt', () => {
  test('return integers as it is', (assert) => {
    assert.equal(toInt(10), 10)
  })

  test('drop decimal values from int', (assert) => {
    assert.equal(toInt(10.12), 10)
  })

  test('return string counterparts as integers', (assert) => {
    assert.equal(toInt('10'), 10)
  })

  test('return string counterparts with decimal as integers', (assert) => {
    assert.equal(toInt('10.60'), 10)
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(toInt('hello'))
    assert.isNull(toInt({}))
    assert.isNull(toInt([]))
    assert.isNull(toInt(null))
    assert.isNull(toInt(undefined))
    assert.isNull(toInt(new Date()))
    assert.isNull(toInt(true))
  })
})

test.group('toNumber', () => {
  test('return number as it is', (assert) => {
    assert.equal(toNumber(10), 10)
  })

  test('keep decimal on numbers', (assert) => {
    assert.equal(toNumber(10.12), 10.12)
  })

  test('return string counterparts as numbers', (assert) => {
    assert.equal(toNumber('10'), 10)
  })

  test('keep decimal on string counterparts', (assert) => {
    assert.equal(toNumber('10.60'), 10.60)
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(toNumber('hello'))
    assert.isNull(toNumber({}))
    assert.isNull(toNumber([]))
    assert.isNull(toNumber(null))
    assert.isNull(toNumber(undefined))
    assert.isNull(toNumber(new Date()))
    assert.isNull(toNumber(true))
  })
})

test.group('toString', () => {
  test('return strings as it is', (assert) => {
    assert.equal(toString('hello'), 'hello')
  })

  test('return arrays as string', (assert) => {
    assert.equal(toString([1,2]), '1,2')
  })

  test('return booleans as string', (assert) => {
    assert.equal(toString(true), 'true')
  })

  test('return booleans as string', (assert) => {
    assert.equal(toString(false), 'false')
  })

  test('return numbers as string', (assert) => {
    assert.equal(toString(1), '1')
  })

  test('return numbers with decimals string', (assert) => {
    assert.equal(toString(10.1), '10.1')
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(toString(undefined))
    assert.isNull(toString({}))
    assert.isNull(toString(null))
  })
})
