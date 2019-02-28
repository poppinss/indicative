const alphaNumericRegex = /^[a-z0-9]+$/i
export default (input) => alphaNumericRegex.test(input)
