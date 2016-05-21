'use strict'

const indicative = require('../')

const data = {
  profile: {
    email: 'bar'
  }
}

const rules = {
  'profile.email': 'email',
  username: 'required'
}

indicative
  .validate(data, rules)
  .catch(function (errors) {
    console.log('\n')
    console.log('single validation >>>')
    console.log(errors)
    console.log('\n\n')
  })

indicative
  .validateAll(data, rules)
  .catch(function (errors) {
    console.log('all validations >>>')
    console.log(errors)
  })

console.log(indicative.is.email(data.profile.email))
