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
import { parser as parse } from '../src/main'
import { rule } from '../src/main'

test.group('Parser', () => {
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
    })
  })

  test('parse combination of arrays and objects', (assert) => {
    const output = parse({ 'users.*.profile.username': 'required' })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
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
    })
  })

  test('parse * expression targeting literal values', (assert) => {
    const output = parse({ 'users.*': 'required' })

    assert.deepEqual(output, {
      users: {
        type: 'array',
        rules: [],
        each: {
          rules: [{
            name: 'required',
            args: [],
          }],
          children: {},
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
          rules: [{
            name: 'required',
            args: [],
          }],
          children: {},
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
    })
  })
})
