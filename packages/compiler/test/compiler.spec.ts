/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { compile } from '../src/compiler'
import { VanillaFormatter } from '../src/Formatters/VanillaFormatter'
import { Stack, getValidations, validationThatFails } from './helpers'

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
})
