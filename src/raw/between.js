export default (input, min, max, inclusive) => {
  input = Number(input)
  if (!inclusive) {
    return (input > Number(min)) && (input < Number(max))
  }

  return (input >= Number(min)) && (input <= Number(max))
}
