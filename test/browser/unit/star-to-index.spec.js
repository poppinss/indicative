'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import starToIndex from '../../../src/core/starToIndex'

group('Star To Index', () => {
  test('transform array of paths to dot properties', (assert) => {
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

    const output = starToIndex(['users', 'username'], data)
    assert.deepEqual(output, ['users.0.username', 'users.1.username'])
  })

  test('do not build properties when value is undefined inside data', (assert) => {
    const data = {}
    const output = starToIndex(['users', 'username'], data)
    assert.deepEqual(output, [])
  })

  test('do not build properties when value is not an array inside data', (assert) => {
    const data = {
      users: {}
    }
    const output = starToIndex(['users', 'username'], data)
    assert.deepEqual(output, [])
  })

  test('do not build properties when data is undefined', (assert) => {
    const output = starToIndex(['users', 'username'])
    assert.deepEqual(output, [])
  })

  test('transfrom nested values to dot properties', (assert) => {
    const data = {
      users: [
        {
          profiles: [
            {
              username: 'foo'
            }
          ]
        },
        {
          profiles: [
            {
              username: 'bar'
            }
          ]
        }
      ]
    }

    const output = starToIndex(['users', 'profiles', 'username'], data)
    assert.deepEqual(output, [
      'users.0.profiles.0.username',
      'users.1.profiles.0.username'
    ])
  })

  test('transfrom deep nested values to dot properties', (assert) => {
    const data = {
      users: [
        {
          profiles: [{}, {}]
        },
        {
          profiles: [{}, {}]
        }
      ]
    }

    const output = starToIndex(['users', 'profiles', 'username'], data)

    assert.deepEqual(output, [
      'users.0.profiles.0.username',
      'users.0.profiles.1.username',
      'users.1.profiles.0.username',
      'users.1.profiles.1.username'
    ])
  })

  test('do not touch existing dot properties', (assert) => {
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

    const output = starToIndex(['users', 'profile.username'], data)
    assert.deepEqual(output, ['users.0.profile.username', 'users.1.profile.username'])
  })

  test('add index when last item in array is blank string', (assert) => {
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

    const output = starToIndex(['users', ''], data)
    assert.deepEqual(output, ['users.0', 'users.1'])
  })
})
