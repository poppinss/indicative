/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { compiler } from '../src/compiler'
import { VanillaFormatter } from '../src/Formatters/VanillaFormatter'
import {
  Stack,
  getValidations,
  getAsyncValidations,
  validationThatFails,
  asyncValidationThatFails,
} from './helpers'

test.group('indicative | bail:true', () => {
  test('stop validations after first failure on same field', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = {
      username: 'required|alpha',
    }

    const required = getValidations(['required'], validationThatFails)
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...alpha, ...required }
    const messages = {
      'username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({ username: '11h' }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'username',
        message: 'Username is required',
        validation: 'required',
      }])

      assert.deepEqual(stack.stack, [])
    }
  })

  test('stop validations after first failure on multiple field', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = {
      age: 'required',
      username: 'alpha',
    }

    const required = getValidations(['required'], validationThatFails)
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...alpha, ...required }
    const messages = {
      'age.required': 'Age is required',
    }

    try {
      await compiler(schema, validations, messages)({ username: '11h' }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'age',
        message: 'Age is required',
        validation: 'required',
      }])

      assert.deepEqual(stack.stack, [])
    }
  })

  test('stop validations after first failure on multiple field', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = {
      age: 'required',
      username: 'alpha',
    }

    const required = getValidations(['required'], validationThatFails)
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...alpha, ...required }
    const messages = {
      'age.required': 'Age is required',
    }

    try {
      await compiler(schema, validations, messages)({ username: '11h' }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'age',
        message: 'Age is required',
        validation: 'required',
      }])

      assert.deepEqual(stack.stack, [])
    }
  })

  test('stop array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.username': 'required',
    }

    const validations = getValidations(['required'], validationThatFails)
    const messages = {
      'users.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({ users: [{}, {}] }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'users.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('stop nested array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.profiles.*.username': 'required',
    }

    const validations = getValidations(['required'], validationThatFails)
    const messages = {
      'users.*.profiles.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({
        users: [{ profiles: [{}, { profiles: {} }],
      }] }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'users.0.profiles.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('stop async array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.username': 'required',
    }

    const validations = getAsyncValidations(['required'], asyncValidationThatFails)
    const messages = {
      'users.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({ users: [{}, {}] }, formatter, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'users.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })
})

test.group('indicative | bail:false', () => {
  test('continue validations after first failure on same field', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = {
      username: 'required|alpha',
    }

    const required = getValidations(['required'], validationThatFails)
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...alpha, ...required }
    const data = { username: '11h' }
    const messages = {
      'username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)(data, formatter, false)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'username',
        message: 'Username is required',
        validation: 'required',
      }])

      assert.deepEqual(stack.stack, [{
        data: data,
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
        },
      }])
    }
  })

  test('continue validations after first failure on multiple field', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = {
      age: 'required',
      username: 'alpha',
    }

    const required = getValidations(['required'], validationThatFails)
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...alpha, ...required }
    const data = { username: '11h' }
    const messages = {
      'age.required': 'Age is required',
    }

    try {
      await compiler(schema, validations, messages)(data, formatter, false)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'age',
        message: 'Age is required',
        validation: 'required',
      }])

      assert.deepEqual(stack.stack, [{
        data: data,
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
        },
      }])
    }
  })

  test('continue array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.username': 'required',
    }

    const validations = getValidations(['required'], validationThatFails)
    const messages = {
      'users.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({ users: [{}, {}] }, formatter, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'users.0.username',
          message: 'Username is required',
          validation: 'required',
        },
        {
          field: 'users.1.username',
          message: 'Username is required',
          validation: 'required',
        },
      ])
    }
  })

  test('continue nested array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.profiles.*.username': 'required',
    }

    const validations = getValidations(['required'], validationThatFails)
    const messages = {
      'users.*.profiles.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({
        users: [{ profiles: [{}, { profiles: {} }],
      }] }, formatter, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'users.0.profiles.0.username',
          message: 'Username is required',
          validation: 'required',
        },
        {
          field: 'users.0.profiles.1.username',
          message: 'Username is required',
          validation: 'required',
        },
      ])
    }
  })

  test('continue async array validations on first failure', async (assert) => {
    const formatter = new VanillaFormatter()

    const schema = {
      'users.*.username': 'required',
    }

    const validations = getAsyncValidations(['required'], asyncValidationThatFails)
    const messages = {
      'users.*.username.required': 'Username is required',
    }

    try {
      await compiler(schema, validations, messages)({ users: [{}, {}] }, formatter, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'users.0.username',
          message: 'Username is required',
          validation: 'required',
        },
        {
          field: 'users.1.username',
          message: 'Username is required',
          validation: 'required',
        },
      ])
    }
  })
})

test.group('indicative | async', () => {
  test('run async validations in sequence', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profile': 'required|object',
      'users.*.profile.username': 'required',
      'users': 'required|array',
    }

    const validations = getAsyncValidations(['required', 'object', 'array'], stack.asyncFn.bind(stack))
    const data = {
      users: [{
        profile: {},
      }],
    }

    await compiler(schema, validations, {})(data, formatter)

    assert.deepEqual(stack.stack, [
      {
        data: { users: [{ profile: {} }] },
        field: 'users',
        args: [],
        type: 'array',
        root: {
          original: data,
        },
      },
      {
        data: { users: [{ profile: {} }] },
        field: 'users',
        args: [],
        type: 'array',
        root: {
          original: data,
        },
      },
      {
        data: { profile: {} },
        field: 'profile',
        args: [],
        type: 'object',
        root: {
          original: data,
          arrayIndexes: [0],
          parentArray: [{ profile: {} }],
          arrayPaths: [['users']],
        },
      },
      {
        data: { profile: {} },
        field: 'profile',
        args: [],
        type: 'object',
        root: {
          original: data,
          arrayIndexes: [0],
          parentArray: [{ profile: {} }],
          arrayPaths: [['users']],
        },
      },
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          arrayIndexes: [0],
          parentArray: [{ profile: {} }],
          arrayPaths: [['users']],
        },
      },
    ])
  })

  test('return exception message when async validation function raises an exception', async (assert) => {
    const formatter = new VanillaFormatter()
    const schema = {
      'username': 'required',
    }

    const validations = getAsyncValidations(['required'], async () => {
      throw new Error('blow up')
    })
    const data = { username: 'virk' }

    try {
      await compiler(schema, validations, {})(data, formatter)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'username',
        message: 'blow up',
        validation: 'ENGINE_EXCEPTION',
      }])
    }
  })

  test('return exception message when validation function raises an exception', async (assert) => {
    const formatter = new VanillaFormatter()
    const schema = {
      'username': 'required',
    }

    const validations = getValidations(['required'], () => {
      throw new Error('blow up')
    })
    const data = { username: 'virk' }

    try {
      await compiler(schema, validations, {})(data, formatter)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'username',
        message: 'blow up',
        validation: 'ENGINE_EXCEPTION',
      }])
    }
  })

  test('execute mix of sync and async validations', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'username': 'required|alpha',
    }

    const required = getAsyncValidations(['required'], stack.asyncFn.bind(stack))
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...required, ...alpha }

    const data = { username: 'virk' }
    await compiler(schema, validations, {})(data, formatter)

    assert.deepEqual(stack.stack, [
      {
        data: data,
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
        },
      },
      {
        data: data,
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
        },
      },
    ])
  })

  test('execute mix of sync and async validations on array fields', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required|alpha',
    }

    const required = getAsyncValidations(['required'], stack.asyncFn.bind(stack))
    const alpha = getValidations(['alpha'], stack.fn.bind(stack))
    const validations = { ...required, ...alpha }

    const data = { users: [{}] }
    await compiler(schema, validations, {})(data, formatter)

    assert.deepEqual(stack.stack, [
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          parentArray: [{}],
          arrayIndexes: [0],
          arrayPaths: [['users']],
        },
      },
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          parentArray: [{}],
          arrayIndexes: [0],
          arrayPaths: [['users']],
        },
      },
    ])
  })
})

test.group('indicative | corrupt data', () => {
  test('do not run array validations when value itself is not array', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }

    const validations = getAsyncValidations(['required'], stack.asyncFn.bind(stack))
    const data = { users: 'virk' }

    await compiler(schema, validations, {})(data, formatter)
    assert.deepEqual(stack.stack, [])
  })

  test('do not run array validations when value index doesn\'t exists', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.2.username': 'required',
    }

    const validations = getAsyncValidations(['required'], stack.asyncFn.bind(stack))

    const data = { users: [{}, {}] }
    await compiler(schema, validations, {})(data, formatter)
    assert.deepEqual(stack.stack, [])
  })
})
