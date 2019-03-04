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
        rhs: [{
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
        rhs: [{
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
        rhs: [{
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
        rhs: [
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
        rhs: [
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
        rhs: [],
        children: {
          profile: {
            rhs: [
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
        rhs: [],
        each: {
          '*': {
            rhs: [],
            children: {
              username: {
                type: 'literal',
                rhs: [
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
        rhs: [],
        each: {
          '*': {
            rhs: [],
            children: {
              profile: {
                type: 'object',
                rhs: [],
                children: {
                  username: {
                    type: 'literal',
                    rhs: [{
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
        rhs: [],
        each: {
          '*': {
            rhs: [{
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
        rhs: [{
          name: 'array',
          args: [],
        }],
        each: {
          '*': {
            rhs: [{
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
        rhs: [{
          name: 'array',
          args: [],
        }],
        each: {
          '*': {
            rhs: [{
              name: 'required',
              args: [],
            }],
            children: {
              profile: {
                type: 'object',
                rhs: [{
                  name: 'object',
                  args: [],
                }],
                children: {
                  age: {
                    type: 'literal',
                    rhs: [
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
        rhs: [],
        children: {
          profile: {
            type: 'object',
            rhs: [
              {
                name: 'required',
                args: [],
              },
            ],
            children: {
              type: {
                type: 'literal',
                rhs: [
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
        rhs: [],
        children: {
          profile: {
            type: 'object',
            rhs: [
              {
                name: 'required',
                args: [],
              },
            ],
            children: {
              type: {
                type: 'literal',
                rhs: [
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
        rhs: [],
        each: {
          '0': {
            rhs: [],
            children: {
              username: {
                type: 'literal',
                rhs: [{
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
        rhs: [],
        each: {
          '0': {
            rhs: [{
              name: 'required',
              args: [],
            }],
            children: {
              username: {
                type: 'literal',
                rhs: [{
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
})

test.group('Parser | messages', () => {
  test('parse messages for fields', (assert) => {
    const output = messagesParser({
      'username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      rules: {},
      named: {
        username: {
          type: 'literal',
          rhs: {
            required: 'Username is required',
          },
        },
      },
    })
  })

  test('parse messages for nested fields', (assert) => {
    const output = messagesParser({
      'username.profile.required': 'Profile is required',
    })

    assert.deepEqual(output, {
      rules: {},
      named: {
        username: {
          type: 'object',
          rhs: {},
          children: {
            profile: {
              type: 'literal',
              rhs: {
                required: 'Profile is required',
              },
            },
          },
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
      rules: {},
      named: {
        username: {
          type: 'object',
          rhs: {
            required: 'Username is required',
          },
          children: {
            profile: {
              type: 'literal',
              rhs: {
                required: 'Profile is required',
              },
            },
          },
        },
      },
    })
  })

  test('parse messages for array', (assert) => {
    const output = messagesParser({
      'users.*.username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      rules: {},
      named: {
        users: {
          type: 'array',
          rhs: {},
          each: {
            '*': {
              rhs: {},
              children: {
                username: {
                  type: 'literal',
                  rhs: {
                    required: 'Username is required',
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  test('parse messages for indexed arrays', (assert) => {
    const output = messagesParser({
      'users.0.username.required': 'Main username is required',
      'users.*.username.required': 'Username is required',
    })

    assert.deepEqual(output, {
      rules: {},
      named: {
        users: {
          type: 'array',
          rhs: {},
          each: {
            '0': {
              rhs: {},
              children: {
                username: {
                  type: 'literal',
                  rhs: {
                    required: 'Main username is required',
                  },
                },
              },
            },
            '*': {
              rhs: {},
              children: {
                username: {
                  type: 'literal',
                  rhs: {
                    required: 'Username is required',
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  test('parse messages array literals', (assert) => {
    const output = messagesParser({
      'users.*.min': 'Array must have one item',
    })

    assert.deepEqual(output, {
      rules: {},
      named: {
        users: {
          type: 'array',
          rhs: {},
          each: {
            '*': {
              rhs: {
                min: 'Array must have one item',
              },
              children: {},
            },
          },
        },
      },
    })
  })

  test('parse messages for just rules', (assert) => {
    const output = messagesParser({
      'required': 'The field is required',
    })

    assert.deepEqual(output, {
      rules: {
        required: 'The field is required',
      },
      named: {},
    })
  })
})
