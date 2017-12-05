'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import parse from '../../../src/core/parse'
import rule from '../../../src/core/rule'

test.group('Parser', () => {
  test('parse simple field rules', (assert) => {
    const output = parse({
      username: 'required'
    })

    assert.deepEqual(output, {
      username: [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })

  test('parse simple rules defined via rule method', (assert) => {
    const output = parse({
      username: [rule('required')]
    })

    assert.deepEqual(output, {
      username: [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })


  test('parse rule with single arg using rule method', (assert) => {
    const output = parse({
      username: [rule('min', 10)]
    })
    assert.deepEqual(output, {
      username: [
        {
          name: 'min',
          args: [10]
        }
      ]
    })
  })


  test('throw exception when rules is not an array and neither a string', (assert) => {
    const output = () => parse({
      username: rule('required')
    })
    assert.throw(output, 'Rules must be defined as a string or an array')
  })

  test('parse multiple rules with args', (assert) => {
    const output = parse({
      username: 'required|range:10,20'
    })
    assert.deepEqual(output, {
      username: [
        {
          name: 'required',
          args: []
        },
        {
          name: 'range',
          args: ['10', '20']
        }
      ]
    })
  })

  test('parse multiple rules using the rule method', (assert) => {
    const output = parse({
      username: [
        rule('required'),
        rule('range', ['10', '20'])
      ]
    })
    assert.deepEqual(output, {
      username: [
        {
          name: 'required',
          args: []
        },
        {
          name: 'range',
          args: ['10', '20']
        }
      ]
    })
  })

  test('leave nested field names untouched', (assert) => {
    const output = parse({
      'user.profile': 'required'
    })
    assert.deepEqual(output, {
      'user.profile': [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })

  test('transform array * fields indexes based upon length of data inside array', (assert) => {
    const data = {
      users: [
        {
          username: 'foo'
        },
        {
          username: 'bar'
        }
      ]
    }

    const output = parse({
      'users.*.username': 'required'
    }, data)

    assert.deepEqual(output, {
      'users.0.username': [
        {
          name: 'required',
          args: []
        }
      ],
      'users.1.username': [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })

  test('parse combination of arrays and objects', (assert) => {
    const data = {
      users: [
        {
          profile: {
            username: 'foo'
          }
        },
        {
          profiles: {
            username: 'bar'
          }
        }
      ]
    }

    const output = parse({
      'users.*.profile.username': 'required'
    }, data)

    assert.deepEqual(output, {
      'users.0.profile.username': [
        {
          name: 'required',
          args: []
        }
      ],
      'users.1.profile.username': [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })

  test('parse * expression targeting literal values', (assert) => {
    const data = {
      users: [
        {
          profile: {
            username: 'foo'
          }
        },
        {
          profiles: {
            username: 'bar'
          }
        }
      ]
    }

    const output = parse({
      'users.*': 'required'
    }, data)

    assert.deepEqual(output, {
      'users.0': [
        {
          name: 'required',
          args: []
        }
      ],
      'users.1': [
        {
          name: 'required',
          args: []
        }
      ]
    })
  })
})
