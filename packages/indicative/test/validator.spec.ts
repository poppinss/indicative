/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { Validator } from '../src/Validator'

test.group('Validator', () => {
  test('run validations on data with defined rules', async (assert) => {
    assert.plan(1)

    const validator = new Validator()
    const data = {}
    const rules = {
      username: 'required',
    }

    try {
      await validator.validate(data, rules, {})
    } catch (errors) {
      assert.deepEqual(errors, [{
        error: 'required validation failed on username',
        field: 'username',
        validation: 'required',
      }])
    }
  })

  test('cache schema using cacheKey', async (assert) => {
    assert.plan(2)

    const validator = new Validator()
    const data = {}
    const rules = {
      username: 'required',
    }

    try {
      await validator.validate(data, rules, {}, { cacheKey: 'foo' })
    } catch (errors) {
      assert.deepEqual(errors, [{
        error: 'required validation failed on username',
        field: 'username',
        validation: 'required',
      }])
    }

    const newRules = {
      age: 'required',
    }

    /**
     * Should not use new rules, since the cache key is same
     */
    try {
      await validator.validate(data, newRules, {}, { cacheKey: 'foo' })
    } catch (errors) {
      assert.deepEqual(errors, [{
        error: 'required validation failed on username',
        field: 'username',
        validation: 'required',
      }])
    }
  })
})

test.group('casts | number', () => {
  test('cast value to number when number rule is used', async (assert) => {
    assert.plan(1)

    const validator = new Validator()
    const data: { age: any } = {
      age: '20',
    }

    const rules = {
      age: 'number',
    }

    await validator.validate(data, rules, {})
    assert.deepEqual(data, { age: 20 })
  })

  test('cast value to number inside a nested object', async (assert) => {
    assert.plan(1)

    const validator = new Validator()
    const data: { profile: any } = {
      profile: {
        age: '20',
      },
    }

    const rules = {
      'profile.age': 'number',
    }

    await validator.validate(data, rules, {})
    assert.deepEqual(data, { profile: { age: 20 } })
  })

  test('cast value to number inside a nested object', async (assert) => {
    assert.plan(1)

    const validator = new Validator()
    const data: { profile: any } = {
      profile: {
        age: '20',
      },
    }

    const rules = {
      'profile.age': 'number',
    }

    await validator.validate(data, rules, {})
    assert.deepEqual(data, { profile: { age: 20 } })
  })

  test('cast value to number inside an array', async (assert) => {
    assert.plan(1)

    const validator = new Validator()
    const data: { codes: any } = {
      codes: ['20'],
    }

    const rules = {
      'codes.*': 'number',
    }

    await validator.validate(data, rules, {})
    assert.deepEqual(data, { codes: [20] })
  })
})
