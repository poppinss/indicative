import isEmail from 'validator/lib/isEmail'
export default (input, options) => isEmail(String(input), options)
