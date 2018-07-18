'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import PLazy from '../../src/core/PLazy'
import pSeries from '../../src/core/pSeries'

group('Promise series', () => {
  test('do not invoke promise unless .then or .catch is called', (assert) => {
    const responses = []

    const promise = function () {
      return new PLazy((resolve) => {
        responses.push('invoked')
        setTimeout(() => {
          resolve()
        })
      })
    }

    promise()
    assert.deepEqual(responses, [])
  })

  test('calling .then on PLazy should invoke promise', (assert) => {
    const responses = []

    const promise = function () {
      return new PLazy((resolve) => {
        responses.push('invoked')
        setTimeout(() => {
          resolve()
        })
      })
    }

    return promise()
      .then(() => {
        assert.deepEqual(responses, ['invoked'])
      })
  })

  test('calling .catch on PLazy should invoke promise', (assert) => {
    const responses = []

    const promise = function () {
      return new PLazy((resolve, reject) => {
        responses.push('invoked')
        setTimeout(() => {
          reject(new Error('dummy'))
        })
      })
    }

    return promise()
      .catch(() => {
        assert.deepEqual(responses, ['invoked'])
      })
  })

  test('run promises in series', async (assert) => {
    const responses = []

    const promise1 = function () {
      return new PLazy((resolve) => {
        setTimeout(() => {
          responses.push(1)
          resolve()
        }, 100)
      })
    }

    const promise2 = function () {
      return new PLazy((resolve) => {
        responses.push(2)
        resolve()
      })
    }

    await pSeries([promise1(), promise2()])
    assert.deepEqual(responses, [1, 2])
  })

  test('run promises serially and lazily', async (assert) => {
    const responses = []

    const promise1 = function () {
      return new PLazy((resolve) => {
        responses.push('pre-1')
        setTimeout(() => {
          responses.push(1)
          resolve()
        }, 100)
      })
    }

    const promise2 = function () {
      return new PLazy((resolve) => {
        responses.push('pre-2')
        responses.push(2)
        resolve()
      })
    }

    await pSeries([promise1(), promise2()])
    assert.deepEqual(responses, ['pre-1', 1, 'pre-2', 2])
  })

  test('break promise chain on first error when bail is true', async (assert) => {
    const responses = []

    const promise1 = function () {
      return new PLazy((resolve, reject) => {
        setTimeout(() => {
          responses.push(1)
          reject(new Error('died'))
        }, 100)
      })
    }

    const promise2 = function () {
      return new PLazy((resolve) => {
        responses.push('pre-2')
        responses.push(2)
        resolve()
      })
    }

    const result = await pSeries([promise1(), promise2()], true)
    assert.deepEqual(responses, [1])
    assert.lengthOf(result, 1)
    assert.equal(result[0].reason.message, 'died')
  })

  test('reject from last promise when bail is true', async (assert) => {
    const responses = []

    const promise1 = function () {
      return new PLazy((resolve) => {
        setTimeout(() => {
          responses.push(1)
          resolve()
        }, 100)
      })
    }

    const promise2 = function () {
      return new PLazy((resolve, reject) => {
        responses.push(2)
        reject(new Error('died'))
      })
    }

    const result = await pSeries([promise1(), promise2()], true)
    assert.deepEqual(responses, [1, 2])
    assert.lengthOf(result, 2)
    assert.isTrue(result[0].fullFilled)
    assert.equal(result[1].reason.message, 'died')
  })

  test('wait till the last promise after rejections when bail is false', async (assert) => {
    const responses = []

    const promise1 = function () {
      return new PLazy((resolve) => {
        setTimeout(() => {
          responses.push(1)
          resolve()
        }, 100)
      })
    }

    const promise2 = function () {
      return new PLazy((resolve, reject) => {
        responses.push(2)
        reject(new Error('died'))
      })
    }

    const promise3 = function () {
      return new PLazy((resolve, reject) => {
        responses.push(3)
        resolve()
      })
    }

    const result = await pSeries([promise1(), promise2(), promise3()], false)
    assert.deepEqual(responses, [1, 2, 3])
    assert.lengthOf(result, 3)
    assert.isTrue(result[0].fullFilled)
    assert.isTrue(result[2].fullFilled)
    assert.equal(result[1].reason.message, 'died')
  })
})
