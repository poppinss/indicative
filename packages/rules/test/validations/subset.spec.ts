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
import * as validations from '../../src/validations'
import { RulesConfig } from '../../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
}

const root = { original: {} }

test.group('Validations | subset', () => {
  test('throw exception when subset values are missing', async (assert) => {
    const args = []
    const fn = () => validations.subset.compile!(args)
    assert.throw(fn, 'subset:make sure to define subset collection')
  })

  test('returns args when it has length', async (assert) => {
    const args = ['author', 'comments', 'related-articles']
    assert.deepEqual(validations.subset.compile!(args), args)
  })

  test('work fine when value is a subset of given superset', async (assert) => {
    const data = { include: ['author'] }
    const field = 'include'

    const args = ['author', 'comments', 'related-articles']
    const result = validations.subset.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { include: ['author'] })
  })

  test('work fine when value is a comma delimited string', async (assert) => {
    const data: { include: any } = { include: 'author,comments' }
    const field = 'include'

    const args = ['author', 'comments', 'related-articles']
    const result = validations.subset.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { include: ['author', 'comments'] })
  })

  test('return false when value is not a subset of given superset', async (assert) => {
    const data = { include: ['author', 'comments', 'invalid-relationship'] }
    const field = 'include'
    const args = ['author', 'comments', 'related-articles']

    assert.isFalse(validations.subset.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { include: ['author', 'comments', 'invalid-relationship'] })
  })

  test('work fine when subset has integer value', async (assert) => {
    const data: { include: any } = { include: [10] }
    const field = 'include'

    const args = ['10', '20']
    const result = validations.subset.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { include: ['10'] })
  })

  test('return false for non string values', async (assert) => {
    const data = {
      field1: true,
      field2: new Date(),
      field3: 10,
    }

    const args = ['10', '20']

    assert.isFalse(validations.subset.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.subset.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.subset.validate(data, 'field3', args, 'literal', root, config))

    assert.deepEqual(data, {
      field1: true,
      field2: new Date(),
      field3: 10,
    })
  })
})
