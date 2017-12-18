'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import getMessage from '../../src/core/getMessage'

group('Message Bag', () => {
  test('return the default message for a field', (assert) => {
    const message = getMessage({}, 'username', 'required')
    assert.equal(message, 'required validation failed on username')
  })

  test('return one of the registered message for a rule', (assert) => {
    const message = getMessage({'required': 'This field is required'}, 'username', 'required')
    assert.equal(message, 'This field is required')
  })

  test('give preference to field.rule over just rule', (assert) => {
    const message = getMessage({
      'required': 'This field is required',
      'username.required': 'Username is required'
    }, 'username', 'required')

    assert.equal(message, 'Username is required')
  })

  test('define custom message as a function', (assert) => {
    const message = getMessage({'username.required': () => 'Username is required'}, 'username', 'required')
    assert.equal(message, 'Username is required')
  })

  test('get message keys with array indexes', (assert) => {
    const message = getMessage({'users.*.username.required': 'Username is required'}, 'users.0.username', 'required')
    assert.equal(message, 'Username is required')
  })

  test('replace dynamic placeholder for field', (assert) => {
    const message = getMessage({'required': '{{ field }} is required'}, 'username', 'required')
    assert.equal(message, 'username is required')
  })

  test('replace dynamic placeholder for validation', (assert) => {
    const message = getMessage({'required': '{{ field }} is {{ validation }}'}, 'username', 'required')
    assert.equal(message, 'username is required')
  })

  test('replace dynamic placeholder for arguments', (assert) => {
    const message = getMessage({
      'between': '{{ field }} must be between {{ argument.0 }} and {{ argument.1 }}'
    }, 'age', 'between', [10, 20])
    assert.equal(message, 'age must be between 10 and 20')
  })
})
