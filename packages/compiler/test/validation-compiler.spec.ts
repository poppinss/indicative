/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { validationCompiler as compile } from '../src/ValidationCompiler'
import { VanillaFormatter } from './helpers'

import {
  Stack,
  getValidations,
  getAsyncValidations,
  validationThatFails,
  asyncValidationThatFails,
} from './helpers'

test.group('compiler', () => {
  test('compile rules schema with simple rules', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()

    const schema = { username: 'required' }
    const validations = getValidations(['required'], stack.fn.bind(stack))

    await compile(schema, validations, {})({}, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: { original: {} },
    }])
  })

  test('compile rules schema with nested rules', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'profile.username': 'required',
    }
    const validations = getValidations(['required'], stack.fn.bind(stack))

    await compile(schema, validations, {})({ profile: {} }, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: { original: { profile: {} } },
    }])
  })

  test('compile rules schema with deeply nested rules', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'profile.social': 'required',
      'profile.social.type': 'required',
    }
    const validations = getValidations(['required'], stack.fn.bind(stack))

    await compile(schema, validations, {})({ profile: { social: {} } }, formatter, {})
    assert.deepEqual(stack.stack, [
      {
        data: { social: {} },
        field: 'social',
        args: [],
        type: 'object',
        root: { original: { profile: { social: {} } } },
      },
      {
        data: {},
        field: 'type',
        args: [],
        type: 'literal',
        root: { original: { profile: { social: {} } } },
      },
    ])
  })

  test('do not run child validations when parent is undefined', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'profile.social': 'required',
      'profile.social.type': 'required',
    }
    const validations = getValidations(['required'], stack.fn.bind(stack))

    await compile(schema, validations, {})({ profile: {} }, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'social',
      args: [],
      type: 'object',
      root: { original: { profile: {} } },
    }])
  })

  test('do not run nested child validations when parent is undefined', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'profile.social': 'required',
      'profile.social.type': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    await compile(schema, validations, {})({}, formatter, {})
    assert.deepEqual(stack.stack, [])
  })

  test('execute nested objects validations inside array', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profile': 'required',
      'users.*.profile.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    await compile(schema, validations, {})({
      users: [{
        profile: {},
      }],
    }, formatter, {})

    assert.deepEqual(stack.stack, [
      {
        data: { profile: {} },
        field: 'profile',
        args: [],
        type: 'object',
        root: {
          original: { users: [{ profile: {} }] },
          arrayIndexes: [0],
          currentIndex: 0,
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
          original: { users: [{ profile: {} }] },
          arrayIndexes: [0],
          currentIndex: 0,
          parentArray: [{ profile: {} }],
          arrayPaths: [['users']],
        },
      },
    ])
  })

  test('execute array validations', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    await compile(schema, validations, {})({ users: [{}] }, formatter, {})

    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: {
        original: { users: [{}] },
        arrayIndexes: [0],
        currentIndex: 0,
        parentArray: [{}],
        arrayPaths: [['users']],
      },
    }])
  })

  test('execute array inside array validations', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profiles.*.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    const data = {
      users: [{
        profiles: [{}],
      }],
    }

    await compile(schema, validations, {})(data, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: {
        original: data,
        arrayIndexes: [0, 0],
        currentIndex: 0,
        parentArray: [{}],
        arrayPaths: [['users'], ['profiles']],
      },
    }])
  })

  test('execute array inside object validations', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'user.profiles.*.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    const data = {
      user: {
        profiles: [{}],
      },
    }

    await compile(schema, validations, {})(data, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: {
        original: data,
        arrayIndexes: [0],
        currentIndex: 0,
        parentArray: [{}],
        arrayPaths: [['user', 'profiles']],
      },
    }])
  })

  test('execute indexed array validation', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profiles.0.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    const data = {
      users: [{
        profiles: [
          {},
          {},
        ],
      }],
    }

    await compile(schema, validations, {})(data, formatter, {})
    assert.deepEqual(stack.stack, [{
      data: {},
      field: 'username',
      args: [],
      type: 'literal',
      root: {
        original: data,
        arrayIndexes: [0, 0],
        currentIndex: 0,
        parentArray: [{}, {}],
        arrayPaths: [['users'], ['profiles']],
      },
    }])
  })

  test('execute indexed and wildcard array validation together', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profiles.0.username': 'required',
      'users.*.profiles.*.username': 'alpha',
    }

    const validations = getValidations(['required', 'alpha'], stack.fn.bind(stack))
    const data = {
      users: [{
        profiles: [
          {},
          {},
        ],
      }],
    }

    await compile(schema, validations, {})(data, formatter, {})

    assert.deepEqual(stack.stack, [
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          arrayIndexes: [0, 0],
          currentIndex: 0,
          parentArray: [{}, {}],
          arrayPaths: [['users'], ['profiles']],
        },
      },
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          arrayIndexes: [0, 0],
          currentIndex: 0,
          parentArray: [{}, {}],
          arrayPaths: [['users'], ['profiles']],
        },
      },
      {
        data: {},
        field: 'username',
        args: [],
        type: 'literal',
        root: {
          original: data,
          arrayIndexes: [0, 1],
          currentIndex: 1,
          parentArray: [{}, {}],
          arrayPaths: [['users'], ['profiles']],
        },
      },
    ])
  })

  test('ignore validations when top level value is not array', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }

    const validations = getValidations(['required'], stack.fn.bind(stack))
    const data = {
      users: 'hello',
    }

    await compile(schema, validations, {})(data, formatter, {})
    assert.deepEqual(stack.stack, [])
  })

  test('reject promise when validation fails', async (assert) => {
    assert.plan(1)
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }

    const validations = getValidations(['required'], validationThatFails)
    const messages = { 'users.*.username.required': 'username is required' }

    try {
      await compile(schema, validations, messages)({ users: [{}] }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        message: 'username is required',
        field: 'users.0.username',
        validation: 'required',
      }])
    }
  })

  test('run validations in series from top to bottom', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
      'users': 'required|array',
    }

    const validations = getValidations(['required', 'array'], stack.fn.bind(stack))
    const data = { users: [{}] }
    await compile(schema, validations, {})(data, formatter, {})

    assert.deepEqual(stack.stack, [
      {
        data: { users: [{}] },
        field: 'users',
        args: [],
        type: 'array',
        root: {
          original: data,
        },
      },
      {
        data: { users: [{}] },
        field: 'users',
        args: [],
        type: 'array',
        root: {
          original: data,
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
          currentIndex: 0,
          parentArray: [{}],
          arrayPaths: [['users']],
        },
      },
    ])
  })

  test('run validations in series with nested objects', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.profile': 'required|object',
      'users.*.profile.username': 'required',
      'users': 'required|array',
    }

    const validations = getValidations(['required', 'object', 'array'], stack.fn.bind(stack))
    const data = {
      users: [{
        profile: {},
      }],
    }

    await compile(schema, validations, {})(data, formatter, {})

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
          currentIndex: 0,
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
          currentIndex: 0,
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
          currentIndex: 0,
          parentArray: [{ profile: {} }],
          arrayPaths: [['users']],
        },
      },
    ])
  })

  test('call validation compile method when exists', async (assert) => {
    assert.plan(1)
    const formatter = new VanillaFormatter()

    const schema = { username: 'min:18' }
    const validations = {
      min: {
        async: false,
        compile (args: any[]): any[] {
          assert.deepEqual(args, ['18'])
          return args
        },
        validate (): boolean {
          return true
        },
      },
    }

    await compile(schema, validations, {})({}, formatter, {})
  })

  test('use return output of compile function as args', async (assert) => {
    const stack: any[] = []
    const formatter = new VanillaFormatter()

    const schema = { username: 'min:18' }
    const validations = {
      min: {
        async: false,
        compile (args: any[]): any[] {
          return [Number(args[0])]
        },
        validate (data, field, args, type, root): boolean {
          stack.push({ data, field, args, type, root })
          return true
        },
      },
    }

    await compile(schema, validations, {})({}, formatter, {})
    assert.deepEqual(stack, [{
      data: {},
      field: 'username',
      args: [18],
      type: 'literal',
      root: { original: {} },
    }])
  })

  test('raise error when validation function for rule doesn\'t exists', async (assert) => {
    const schema = { username: 'min:18' }
    const validations = {}

    const fn = () => compile(schema, validations, {})
    assert.throw(fn, 'min is not registered as a validation')
  })

  test('run validations on array literals', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*': 'number',
    }

    const validations = getValidations(['number'], stack.fn.bind(stack))
    const data = {
      users: [22, 24],
    }

    await compile(schema, validations, {})(data, formatter, {})

    assert.deepEqual(stack.stack, [
      {
        data: { '0': 22 },
        field: '0',
        args: [],
        type: 'literal',
        root: {
          original: data,
          parentArray: [22, 24],
          arrayIndexes: [0],
          currentIndex: 0,
          arrayPaths: [['users']],
        },
      },
      {
        data: { '1': 24 },
        field: '1',
        args: [],
        type: 'literal',
        root: {
          original: data,
          parentArray: [22, 24],
          arrayIndexes: [1],
          currentIndex: 1,
          arrayPaths: [['users']],
        },
      },
    ])
  })

  test('run validations on indexed array literals', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.0': 'number',
    }

    const validations = getValidations(['number'], stack.fn.bind(stack))
    const data = {
      users: [22, 24],
    }

    await compile(schema, validations, {})(data, formatter, {})

    assert.deepEqual(stack.stack, [
      {
        data: { '0': 22 },
        field: '0',
        args: [],
        type: 'literal',
        root: {
          original: data,
          parentArray: [22, 24],
          arrayIndexes: [0],
          currentIndex: 0,
          arrayPaths: [['users']],
        },
      },
    ])
  })
})

test.group('compiler | bail:true', () => {
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
      await compile(schema, validations, messages)({ username: '11h' }, formatter, {}, true)
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
      await compile(schema, validations, messages)({ username: '11h' }, formatter, {}, true)
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
      await compile(schema, validations, messages)({ username: '11h' }, formatter, {}, true)
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
      await compile(schema, validations, messages)({ users: [{}, {}] }, formatter, {}, true)
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
      await compile(schema, validations, messages)({
        users: [{ profiles: [{}, { profiles: {} }],
      }] }, formatter, {}, true)
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
      await compile(schema, validations, messages)({ users: [{}, {}] }, formatter, {}, true)
    } catch (errors) {
      assert.deepEqual(errors, [{
        field: 'users.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })
})

test.group('compiler | bail:false', () => {
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
      await compile(schema, validations, messages)(data, formatter, {}, false)
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
      await compile(schema, validations, messages)(data, formatter, {}, false)
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
      await compile(schema, validations, messages)({ users: [{}, {}] }, formatter, {}, false)
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
      await compile(schema, validations, messages)({
        users: [{ profiles: [{}, { profiles: {} }],
      }] }, formatter, {}, false)
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
      await compile(schema, validations, messages)({ users: [{}, {}] }, formatter, {}, false)
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

test.group('compiler | async', () => {
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

    await compile(schema, validations, {})(data, formatter, {})

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
          currentIndex: 0,
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
          currentIndex: 0,
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
          currentIndex: 0,
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
      await compile(schema, validations, {})(data, formatter, {})
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
      await compile(schema, validations, {})(data, formatter, {})
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
    await compile(schema, validations, {})(data, formatter, {})

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
    await compile(schema, validations, {})(data, formatter, {})

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
          currentIndex: 0,
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
          currentIndex: 0,
          arrayPaths: [['users']],
        },
      },
    ])
  })
})

test.group('compiler | corrupt data', () => {
  test('do not run array validations when value itself is not array', async (assert) => {
    const stack = new Stack()
    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }

    const validations = getAsyncValidations(['required'], stack.asyncFn.bind(stack))
    const data = { users: 'virk' }

    await compile(schema, validations, {})(data, formatter, {})
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
    await compile(schema, validations, {})(data, formatter, {})
    assert.deepEqual(stack.stack, [])
  })
})

test.group('compiler | messages', () => {
  test('define custom messages for literals', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = {
      username: 'required',
    }

    const messages = {
      'username.required': 'Username is required',
    }

    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({}, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('messages must include full path for nested object', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'profile.username': 'required' }
    const messages = {
      'profile.username.required': 'Username is required',
    }

    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ profile: {} }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'profile.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('messages must include full path for deeply nested object', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'profile.social.type': 'required' }
    const messages = {
      'profile.social.type.required': 'Social type is required',
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ profile: { social: {} } }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'profile.social.type',
        message: 'Social type is required',
        validation: 'required',
      }])
    }
  })

  test('messages must include full path for array childs', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'users.*.username': 'required' }
    const messages = {
      'users.*.username.required': 'Username is required',
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ users: [{}] }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'users.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('messages must include full path for nested array childs', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'users.*.profiles.*.username': 'required' }
    const messages = {
      'users.*.profiles.*.username.required': 'Username is required',
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ users: [{ profiles: [{}] }] }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'users.0.profiles.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('messages must include full path for nested objects and array childs', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'user.profiles.*.username': 'required' }
    const messages = {
      'user.profiles.*.username.required': 'Username is required',
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ user: { profiles: [{}] } }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'user.profiles.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('define message as a function', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'user.profiles.*.username': 'required' }
    const messages = {
      'user.profiles.*.username.required': function message () {
        return 'Username is required'
      },
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ user: { profiles: [{}] } }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'user.profiles.0.username',
        message: 'Username is required',
        validation: 'required',
      }])
    }
  })

  test('return dynamic messages from function', async (assert) => {
    assert.plan(1)
    let i = 0

    const formatter = new VanillaFormatter()
    const schema = { 'user.profiles.*.username': 'required' }
    const messages = {
      'user.profiles.*.username.required': function message () {
        i++
        return `${i} username is required`
      },
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ user: { profiles: [{}, {}] } }, formatter, {}, false)
    } catch (error) {
      assert.deepEqual(error, [
        {
          field: 'user.profiles.0.username',
          message: '1 username is required',
          validation: 'required',
        },
        {
          field: 'user.profiles.1.username',
          message: '2 username is required',
          validation: 'required',
        },
      ])
    }
  })

  test('use default message when no message is defined', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = { 'username': 'required' }
    const messages = {}
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({}, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'username',
        message: 'required validation failed on username',
        validation: 'required',
      }])
    }
  })

  test('use correct message for array when its child are missing in messages schema', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = {
      'users': 'required',
      'users.*.name': 'required',
    }
    const messages = {
      'users.required': 'Users must be an array',
    }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ users: {} }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [{
        field: 'users',
        message: 'Users must be an array',
        validation: 'required',
      }])
    }
  })

  test('get correct path to object child inside default message', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = {
      'user': 'required',
      'user.username': 'required',
    }
    const messages = { 'user.required': 'Users object must be defined' }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ user: {} }, formatter, {}, false)
    } catch (error) {
      assert.deepEqual(error, [
        {
          field: 'user',
          message: 'Users object must be defined',
          validation: 'required',
        },
        {
          field: 'user.username',
          message: 'required validation failed on user.username',
          validation: 'required',
        },
      ])
    }
  })

  test('get correct path to array child inside default message', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = {
      'users.*.username': 'required',
    }
    const messages = {}
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ users: [{}] }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [
        {
          field: 'users.0.username',
          message: 'required validation failed on users.0.username',
          validation: 'required',
        },
      ])
    }
  })

  test('use default message when field has messages but not for that rule', async (assert) => {
    assert.plan(1)

    const formatter = new VanillaFormatter()
    const schema = {
      'user': 'required',
    }
    const messages = { 'user.object': 'Users must be object' }
    const validations = getValidations(['required'], validationThatFails)

    try {
      await compile(schema, validations, messages)({ user: {} }, formatter, {})
    } catch (error) {
      assert.deepEqual(error, [
        {
          field: 'user',
          message: 'required validation failed on user',
          validation: 'required',
        },
      ])
    }
  })
})
