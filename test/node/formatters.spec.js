'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import * as formatters from '../../src/formatters'

test.group('Vanilla Formatter', () => {
  test('add new error', (assert) => {
    const formatter = new formatters.Vanilla()
    formatter.addError('validation failed', 'username', 'required', [])
    assert.deepEqual(formatter.toJSON(), [
      {
        field: 'username',
        message: 'validation failed',
        validation: 'required'
      }
    ])
  })
})

test.group('JsonApi Formatter', () => {
  test('add new error', (assert) => {
    const formatter = new formatters.JsonApi()
    formatter.addError('validation failed', 'username', 'required', [])
    assert.deepEqual(formatter.toJSON(), [
      {
        source: { pointer: 'username' },
        detail: 'validation failed',
        title: 'required'
      }
    ])
  })
})

test.group('Raw Formatter', () => {
  test('add new error without params', (assert) => {
    const formatter = new formatters.Raw()
    formatter.addError('', 'username', 'required', [])
    assert.deepEqual(formatter.toJSON(), [
      {
        field: 'username',
        errors: [
          {
            name: 'required',
            params: []
          }
        ]
      }
    ])
  })

  test('add multiple errors for single field', (assert) => {
    const formatter = new formatters.Raw()
    formatter.addError('', 'price', 'required', [])
    formatter.addError('', 'price', 'integer', [])
    assert.deepEqual(formatter.toJSON(), [
      {
        field: 'price',
        errors: [
          {
            name: 'required',
            params: []
          },
          {
            name: 'integer',
            params: []
          }
        ]
      }
    ])
  })

  test('add an error with arguments', (assert) => {
    const formatter = new formatters.Raw()
    formatter.addError('', 'password', 'min', [6])

    assert.deepEqual(formatter.toJSON(), [
      {
        field: 'password',
        errors: [
          {
            name: 'min',
            params: [6]
          }
        ]
      }
    ])
  })
})
