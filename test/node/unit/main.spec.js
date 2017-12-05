import test from 'japa'
import indicative from '../../../'

test.group('Indicative', () => {
  test('should be able to call validate with inbuilt rules', async (assert) => {
    assert.plan(1)

    const data = {}
    const rules = {
      username: 'required'
    }

    try {
      const response = await indicative.validate(data, rules)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          validation: 'required',
          field: 'username',
          message: 'required validation failed on username'
        }
      ])
    }
  })

  test('should be able to call validateAll with inbuilt rules', async (assert) => {
    assert.plan(1)

    const data = {}
    const rules = {
      username: 'required',
      email: 'required'
    }

    try {
      const response = await indicative.validate(data, rules)
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
  })

  test('should be able to call raw validation methods', async (assert) => {
    assert.isTrue(indicative.is.existy('hello'))
  })
})
