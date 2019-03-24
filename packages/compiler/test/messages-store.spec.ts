/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { messagesParser } from 'indicative-parser'
import { MessagesStore } from '../src/MessagesStore'

test.group('Messages Store', () => {
  test('make message for a given field', (assert) => {
    const messages = {
      'username.required': 'Username is required',
    }

    const parsedMessagess = messagesParser(messages)
    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)

    assert.equal(
      store.getMessageFor('username', { name: 'required', args: [] }),
      'Username is required',
    )
  })

  test('make message for a rule when field message is not defined', (assert) => {
    const messages = {
      'required': 'Field is required',
    }

    const parsedMessagess = messagesParser(messages)
    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)

    assert.equal(
      store.getMessageFor('username', { name: 'required', args: [] }),
      'Field is required',
    )
  })

  test('return default message when no message is defined', (assert) => {
    const messages = {
      'required': 'Field is required',
    }

    const parsedMessagess = messagesParser(messages)
    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)
    const rule = { name: 'alpha', args: [] }

    assert.equal(
      (store.getMessageFor('username', rule) as Function)('username', rule.name),
      'alpha validation failed on username',
    )
  })

  test('return message for the nested field', (assert) => {
    const messages = {
      'profile.username.required': 'Username is required',
    }

    const parsedMessagess = messagesParser(messages)
    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules, 'profile')
    const rule = { name: 'required', args: [] }

    assert.equal(store.getMessageFor('username', rule), 'Username is required')
  })

  test('return message from the child store', (assert) => {
    const messages = {
      'profiles.*.username.required': 'Username is required',
    }

    const parsedMessagess = messagesParser(messages)
    const rule = { name: 'required', args: [] }

    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)
    const childStore = store.getChildStore(['profiles', '*'])

    assert.equal(childStore.getMessageFor('username', rule), 'Username is required')
  })

  test('return message from the nested child store', (assert) => {
    const messages = {
      'user.profiles.*.username.required': 'Username is required',
    }

    const parsedMessagess = messagesParser(messages)
    const rule = { name: 'required', args: [] }

    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)
    const childStore = store.getChildStore(['user'])
    const nestedStore = childStore.getChildStore(['profiles', '*'])

    assert.equal(nestedStore.getMessageFor('username', rule), 'Username is required')
  })

  test('replace placeholders in message string', (assert) => {
    const messages = {
      'username.min': '{{ field }} must be less than {{ arguments.0 }} chars',
    }

    const parsedMessagess = messagesParser(messages)
    const rule = { name: 'min', args: [10] }

    const store = new MessagesStore(parsedMessagess.fields, parsedMessagess.rules)
    assert.equal(store.getMessageFor('username', rule), 'username must be less than 10 chars')
  })
})
