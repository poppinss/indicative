import format from 'date-fns/format'

export default (input, formats) => {
  return (Array.isArray(formats) ? formats : [formats]).some(pattern => {
    let sanitizedInput = input
    let hasTimeZone = false

    // Following https://www.w3.org/TR/NOTE-datetime
    if (pattern.endsWith('ZZ')) {
      sanitizedInput = input.replace(/(\+|-)\d{4}$/, '')
      pattern = pattern.replace(/ZZ$/, '')
      hasTimeZone = true
    } else if (pattern.endsWith('Z')) {
      sanitizedInput = input.replace(/Z$/, '').replace(/(\+|-)\d{2}:\d{2}$/, '')
      pattern = pattern.replace(/Z$/, '')
      hasTimeZone = true
    }

    const formattedInput = format(sanitizedInput, pattern)

    return formattedInput !== 'Invalid Date' &&
      formattedInput === sanitizedInput &&
      (!hasTimeZone || sanitizedInput !== input)
  })
}
