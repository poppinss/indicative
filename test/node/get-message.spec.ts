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
import { getMessage } from '../../src/core/getMessage'

test.group('Message Bag', () => {
  test('return the default message for a field', (assert) => {
    const message = getMessage(
      {},
      'username',
      'required',
      [],
    )
    assert.equal(message, 'required validation failed on username')
  })

  test('return one of the registered message for a rule', (assert) => {
    const message = getMessage(
      {
        'required': 'This field is required',
      },
      'username',
      'required',
      [],
    )
    assert.equal(message, 'This field is required')
  })

  test('give preference to field.rule over just rule', (assert) => {
    const message = getMessage(
      {
        'required': 'This field is required',
        'username.required': 'Username is required',
      },
      'username',
      'required',
      [],
    )

    assert.equal(message, 'Username is required')
  })

  test('define custom message as a function', (assert) => {
    const message = getMessage(
      {
        'username.required': () => 'Username is required',
      },
      'username',
      'required',
      [],
    )
    assert.equal(message, 'Username is required')
  })

  test('get message keys with array indexes', (assert) => {
    const message = getMessage(
      {
        'users.*.username.required': 'Username is required',
      },
      'users.0.username',
      'required',
      [],
    )
    assert.equal(message, 'Username is required')
  })

  test('define different messages for different array indexes', (assert) => {
    const messages = {
      'users.0.username.required': 'Primary username is required',
      'users.1.username.required': 'Secondary username is required',
    }

    const message1 = getMessage(messages, 'users.0.username', 'required', [])
    const message2 = getMessage(messages, 'users.1.username', 'required', [])

    assert.equal(message1, 'Primary username is required')
    assert.equal(message2, 'Secondary username is required')
  })

  test('define different messages for different array indexes', (assert) => {
    const messages = {
      'users.0.username.required': 'Primary username is required',
      'users.1.username.required': 'Secondary username is required',
    }

    const message1 = getMessage(messages, 'users.0.username', 'required', [])
    const message2 = getMessage(messages, 'users.1.username', 'required', [])

    assert.equal(message1, 'Primary username is required')
    assert.equal(message2, 'Secondary username is required')
  })

  test('replace dynamic placeholder for field', (assert) => {
    const message = getMessage(
      {
        'required': '{{ field }} is required',
      },
      'username',
      'required',
      [],
    )
    assert.equal(message, 'username is required')
  })

  test('replace dynamic placeholder for validation', (assert) => {
    const message = getMessage(
      {
        'required': '{{ field }} is {{ validation }}',
      },
      'username',
      'required',
      [],
    )
    assert.equal(message, 'username is required')
  })

  test('replace dynamic placeholder for arguments', (assert) => {
    const message = getMessage(
      {
        'between': '{{ field }} must be between {{ argument.0 }} and {{ argument.1 }}',
      },
      'age',
      'between',
      [10, 20],
    )
    assert.equal(message, 'age must be between 10 and 20')
  })

  test('work fine when message is defined in camelCase', (assert) => {
    const message = getMessage(
      {
        'arrayIncludes': 'This field is required',
      },
      'username',
      'array_includes',
      [],
    )

    assert.equal(message, 'This field is required')
  })

  test('work fine when message is defined in snake case', (assert) => {
    const message = getMessage(
      {
        'array_includes': 'This field is required',
      },
      'username',
      'array_includes',
      [],
    )

    assert.equal(message, 'This field is required')
  })
})
