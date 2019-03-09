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
import { getValidations, validationThatFails } from './helpers'

test.group('messages', () => {
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
