import indicative from '../../..'
import asyncify from '../asyncify'

QUnit.module('Main', function () {
  QUnit.test('return error when validation fails', function (assert) {
    const done = assert.async()
    asyncify(async function () {
      const data = {}

      const rules = {
        username: 'required'
      }

      try {
        await indicative.validate(data, rules)
      } catch (errors) {
        assert.deepEqual(errors, [
          {
            validation: 'required',
            field: 'username',
            message: 'required validation failed on username'
          }
        ])
      }
    }, done)
  })

  QUnit.test('run first validation error only', function (assert) {
    const done = assert.async()
    asyncify(async function () {
      const data = {}

      const rules = {
        username: 'required',
        email: 'required'
      }

      try {
        await indicative.validate(data, rules)
      } catch (errors) {
        assert.deepEqual(errors, [
          {
            validation: 'required',
            field: 'username',
            message: 'required validation failed on username'
          }
        ])
      }
    }, done)
  })

  QUnit.test('run all validation errors when using validateAll', function (assert) {
    const done = assert.async()
    asyncify(async function () {
      const data = {}

      const rules = {
        username: 'required',
        email: 'required'
      }

      try {
        await indicative.validateAll(data, rules)
      } catch (errors) {
        assert.deepEqual(errors, [
          {
            validation: 'required',
            field: 'username',
            message: 'required validation failed on username'
          },
          {
            validation: 'required',
            field: 'email',
            message: 'required validation failed on email'
          }
        ])
      }
    }, done)
  })

  QUnit.test('pass custom validation message for the rule', function (assert) {
    const done = assert.async()
    asyncify(async function () {
      const data = {}

      const rules = {
        username: 'required'
      }

      try {
        await indicative.validate(data, rules, {
          required: '{{ field }} is required'
        })
      } catch (errors) {
        assert.deepEqual(errors, [
          {
            validation: 'required',
            field: 'username',
            message: 'username is required'
          }
        ])
      }
    }, done)
  })

  QUnit.test('give preference to field.rule message over rule message', function (assert) {
    const done = assert.async()
    asyncify(async function () {
      const data = {}

      const rules = {
        username: 'required'
      }

      try {
        await indicative.validate(data, rules, {
          required: '{{ field }} is required',
          'username.required': 'Choose a username for your account'
        })
      } catch (errors) {
        assert.deepEqual(errors, [
          {
            validation: 'required',
            field: 'username',
            message: 'Choose a username for your account'
          }
        ])
      }
    }, done)
  })
})
