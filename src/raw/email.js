const emailRegex = /^([\w-]+(?:\.[\w-]+)*)(\+[\w.-]+)?@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,63}(?:\.[a-z]{2})?)$/i

export default (input) => emailRegex.test(input)
