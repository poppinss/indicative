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
import { schemaParser as parse, messagesParser } from '../src/main'
import { rule } from '../src/main'

test.group('Parser | schema', () => {
  test('parse simple field rules', (assert) => {
    const output = parse({
      username: 'required',
    })

    assert.deepEqual(output, {
      username: {
        type: 'literal',
        rules: [{
          name: 'required',
          args: [],
        }],
      },
    })
  })

  test('parse simple rules defined via rule method', (assert) => {
    const output = parse({
      username: [rule('required', [])],
    })

    assert.deepEqual(output, {
      username: {
        type: 'literal',
        rules: [{
          name: 'required',
          args: [],
        }],
      },
    })
  })

  test('parse rule with single arg using rule method', (assert) => {
    const output = parse({
      username: [rule('min', 10)],
    })

    assert.deepEqual(output, {
      username: {
        type: 'literal',
        rules: [{
          name: 'min',
          args: [10],
        }],
      },
    })
  })

  test('parse multiple rules with args', (assert) => {
    const output = parse({
      username: 'required|range:10,20',
    })

    assert.deepEqual(output, {
      username: {
        type: 'literal',
        rules: [
          {
            name: 'required',
            args: [],
          },
          {
            name: 'range',
            args: ['10', '20'],
          },
        ],
      },
    })
  })

  test('parse multiple rules using the rule method', (assert) => {
    const output = parse({
      username: [
        rule('required', []),
        rule('range', ['10', '20']),
      ],
    })

    assert.deepEqual(output, {
      username: {
        type: 'literal',
        rules: [
          {
            name: 'required',
            args: [],
          },
          {
            name: 'range',
            args: ['10', '20'],
          },
        ],
      },
    })
  })

  test('add rules to nested child', (assert) => {
    const output = parse({
      'user.profile': 'required',
    })

    assert.deepEqual(output, {
      user: {
        type: 'object',
        rules: [],
        children: {
          profile: {
            rules: [
              {
                name: 'required',
                args: [],
              },
            ],
            type: 'literal',
          },
        },
      },
    })
  })

  test('handle array based expressions', (assert) => {
    const output = parse({ 'users.*.username': 'required' })

    assert.deepEqual(output, {
      'users': {
        type: 'array',
        rules: [],
        each: {
          '*': {
            rules: [],
            children: {
              username: {
                type: 'literal',
                rules: [
                  {
                    name: 'required',
                    args: [],
                  },
                ],
              },
            },
          },
        },
      },
    })
  })

  test('parse combination of arrays and objects', (assert) => {
    const output = parse({ 'users.*.profile.username': 'required' })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
          '*': {
            rules: [],
            children: {
              profile: {
                type: 'object',
                rules: [],
                children: {
                  username: {
                    type: 'literal',
                    rules: [{
                      name: 'required',
                      args: [],
                    }],
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  test('parse * expression targeting literal values', (assert) => {
    const output = parse({ 'users.*': 'required' })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
          '*': {
            rules: [{
              name: 'required',
              args: [],
            }],
            children: {},
          },
        },
      },
    })
  })

  test('parse multiple rules with progressive members', (assert) => {
    const output = parse({
      'users.*': 'required',
      'users': 'array',
    })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [{
          name: 'array',
          args: [],
        }],
        each: {
          '*': {
            rules: [{
              name: 'required',
              args: [],
            }],
            children: {},
          },
        },
      },
    })
  })

  test('parse multiple rules with complex members', (assert) => {
    const output = parse({
      'users.*': 'required',
      'users': 'array',
      'users.*.profile.age': 'required|max:60',
      'users.*.profile': 'object',
    })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [{
          name: 'array',
          args: [],
        }],
        each: {
          '*': {
            rules: [{
              name: 'required',
              args: [],
            }],
            children: {
              profile: {
                type: 'object',
                rules: [{
                  name: 'object',
                  args: [],
                }],
                children: {
                  age: {
                    type: 'literal',
                    rules: [
                      {
                        name: 'required',
                        args: [],
                      },
                      {
                        name: 'max',
                        args: ['60'],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  test('add rules to deeply nested child', (assert) => {
    const output = parse({
      'user.profile': 'required',
      'user.profile.type': 'required',
    })

    assert.deepEqual(output, {
      user: {
        type: 'object',
        rules: [],
        children: {
          profile: {
            type: 'object',
            rules: [
              {
                name: 'required',
                args: [],
              },
            ],
            children: {
              type: {
                type: 'literal',
                rules: [
                  {
                    name: 'required',
                    args: [],
                  },
                ],
              },
            },
          },
        },
      },
    })
  })

  test('add rules to deeply nested child with parent added at later stage', (assert) => {
    const output = parse({
      'user.profile.type': 'required',
      'user.profile': 'required',
    })

    assert.deepEqual(output, {
      user: {
        type: 'object',
        rules: [],
        children: {
          profile: {
            type: 'object',
            rules: [
              {
                name: 'required',
                args: [],
              },
            ],
            children: {
              type: {
                type: 'literal',
                rules: [
                  {
                    name: 'required',
                    args: [],
                  },
                ],
              },
            },
          },
        },
      },
    })
  })

  test('parse array expression with defined indexes', (assert) => {
    const output = parse({ 'users.0.username': 'required' })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
          '0': {
            rules: [],
            children: {
              username: {
                type: 'literal',
                rules: [{
                  name: 'required',
                  args: [],
                }],
              },
            },
          },
        },
      },
    })
  })

  test('parse array expression with and without childs on defined indexes', (assert) => {
    const output = parse({
      'users.0.username': 'required',
      'users.0': 'required',
    })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
          '0': {
            rules: [{
              name: 'required',
              args: [],
            }],
            children: {
              username: {
                type: 'literal',
                rules: [{
                  name: 'required',
                  args: [],
                }],
              },
            },
          },
        },
      },
    })
  })

  test('raise error when object is reshaped as an array', (assert) => {
    const output = () => parse({
      'user.username': 'required',
      'user.*': 'required',
    })

    assert.throw(output, 'cannot reshape user object to an array')
  })

  test('raise error when array is reshaped as an object', (assert) => {
    const output = () => parse({
      'user.*': 'required',
      'user.username': 'required',
    })

    assert.throw(output, 'cannot reshape user array to an object')
  })

  test('raise error when rule value is missing', (assert) => {
    const output = () => parse({
      'user.username': '',
    })

    assert.throw(output, 'make sure to define rules for user.username')
  })
})

test.group('Parser | messages', () => {
  test('parse messages for fields', (assert) => {
    const output = messagesParser({
      'username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      generic: {},
      named: {
        username: {
          required: 'Username is required',
        },
      },
    })
  })

  test('parse messages for nested fields', (assert) => {
    const output = messagesParser({
      'username.profile.required': 'Profile is required',
    })

    assert.deepEqual(output, {
      generic: {},
      named: {
        'username.profile': {
          required: 'Profile is required',
        },
      },
    })
  })

  test('parse messages for nested fields and top level fields', (assert) => {
    const output = messagesParser({
      'username.profile.required': 'Profile is required',
      'username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      generic: {},
      named: {
        username: {
          required: 'Username is required',
        },
        'username.profile': {
          required: 'Profile is required',
        },
      },
    })
  })

  test('parse messages for array', (assert) => {
    const output = messagesParser({
      'users.*.username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      generic: {},
      named: {
        'users.*.username': {
          required: 'Username is required',
        },
      },
    })
  })

  test('parse messages for just rules', (assert) => {
    const output = messagesParser({
      'required': 'The field is required',
    })

    assert.deepEqual(output, {
      generic: {
        required: 'The field is required',
      },
      named: {},
    })
  })
})
