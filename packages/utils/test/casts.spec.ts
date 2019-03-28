/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { cast } from '../src/cast'

test.group('toBoolean', () => {
  test('return boolean values as it is', (assert) => {
    assert.isFalse(cast(false, 'boolean'))
    assert.isTrue(cast(true, 'boolean'))
  })

  test('return string counterparts as boolean', (assert) => {
    assert.isFalse(cast('false', 'boolean'))
    assert.isTrue(cast('true', 'boolean'))
  })

  test('return number counterparts as boolean', (assert) => {
    assert.isFalse(cast(0, 'boolean'))
    assert.isTrue(cast(1, 'boolean'))
  })

  test('return string number counterparts as boolean', (assert) => {
    assert.isFalse(cast('0', 'boolean'))
    assert.isTrue(cast('1', 'boolean'))
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(cast({}, 'boolean'))
    assert.isNull(cast([], 'boolean'))
    assert.isNull(cast(null, 'boolean'))
    assert.isNull(cast(undefined, 'boolean'))
    assert.isNull(cast(10, 'boolean'))
    assert.isNull(cast('hello', 'boolean'))
  })
})

test.group('toDate', () => {
  test('return dates as it is', (assert) => {
    const today = new Date()
    assert.equal(cast(today, 'date'), today)
  })

  test('return string counterparts as dates', (assert) => {
    const today = new Date()
    assert.equal(cast(today.toString(), 'date')!.toString(), today.toString())
  })

  test('return invalid string counterparts as null', (assert) => {
    assert.isNull(cast('hello', 'date'))
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(cast('hello', 'date'))
    assert.isNull(cast({}, 'date'))
    assert.isNull(cast([], 'date'))
    assert.isNull(cast(null, 'date'))
    assert.isNull(cast(undefined, 'date'))
    assert.isNull(cast(10, 'date'))
    assert.isNull(cast(true, 'date'))
  })
})

test.group('toInt', () => {
  test('return integers as it is', (assert) => {
    assert.equal(cast(10, 'integer'), 10)
  })

  test('drop decimal values from int', (assert) => {
    assert.equal(cast(10.12, 'integer'), 10)
  })

  test('return string counterparts as integers', (assert) => {
    assert.equal(cast('10', 'integer'), 10)
  })

  test('return string counterparts with decimal as integers', (assert) => {
    assert.equal(cast('10.60', 'integer'), 10)
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(cast('hello', 'integer'))
    assert.isNull(cast({}, 'integer'))
    assert.isNull(cast([], 'integer'))
    assert.isNull(cast(null, 'integer'))
    assert.isNull(cast(undefined, 'integer'))
    assert.isNull(cast(new Date(), 'integer'))
    assert.isNull(cast(true, 'integer'))
  })
})

test.group('toNumber', () => {
  test('return number as it is', (assert) => {
    assert.equal(cast(10, 'number'), 10)
  })

  test('keep decimal on numbers', (assert) => {
    assert.equal(cast(10.12, 'number'), 10.12)
  })

  test('return string counterparts as numbers', (assert) => {
    assert.equal(cast('10', 'number'), 10)
  })

  test('keep decimal on string counterparts', (assert) => {
    assert.equal(cast('10.60', 'number'), 10.60)
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(cast('hello', 'number'))
    assert.isNull(cast({}, 'number'))
    assert.isNull(cast([], 'number'))
    assert.isNull(cast(null, 'number'))
    assert.isNull(cast(undefined, 'number'))
    assert.isNull(cast(new Date(), 'number'))
    assert.isNull(cast(true, 'number'))
  })
})

test.group('toString', () => {
  test('return strings as it is', (assert) => {
    assert.equal(cast('hello', 'string'), 'hello')
  })

  test('return arrays as string', (assert) => {
    assert.equal(cast([1,2], 'string'), '1,2')
  })

  test('return booleans as string', (assert) => {
    assert.equal(cast(true, 'string'), 'true')
  })

  test('return booleans as string', (assert) => {
    assert.equal(cast(false, 'string'), 'false')
  })

  test('return numbers as string', (assert) => {
    assert.equal(cast(1, 'string'), '1')
  })

  test('return numbers with decimals string', (assert) => {
    assert.equal(cast(10.1, 'string'), '10.1')
  })

  test('return null for non-castable types', (assert) => {
    assert.isNull(cast(undefined, 'string'))
    assert.isNull(cast({}, 'string'))
    assert.isNull(cast(null, 'string'))
  })
})
