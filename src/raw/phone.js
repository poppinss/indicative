const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/
export default (input) => phoneRegex.test(input)
