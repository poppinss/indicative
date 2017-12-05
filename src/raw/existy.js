export default (input) => {
  if (typeof (input) === 'string') {
    return input.length > 0
  }
  return (input !== null && input !== undefined)
}
