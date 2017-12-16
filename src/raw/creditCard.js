import isCreditCard from 'validator/lib/isEmail'
export default (input, options) => isCreditCard(String(input), options)
