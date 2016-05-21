'use strict'

const indicative = require('../')

const data = {
  profile: [
    {
      email: 'virk.officials@gmail.com'
    },
    {
      email: 'foo@gmail.com'
    }
  ]
}

const rules = {
  'profile.*.email': 'email'
}

indicative.validate(data, rules).then(console.log).catch(console.log)
