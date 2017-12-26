import format from 'date-fns/format'

export default (input, formats) => {
  return (Array.isArray(formats) ? formats : [formats]).some(pattern => {
    const formattedInput = format(input, pattern)
    return formattedInput !== 'Invalid Date' && formattedInput === input
  })
}
