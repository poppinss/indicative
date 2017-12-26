// Following https://www.w3.org/TR/NOTE-datetime
import format from 'date-fns/format'

export default (input, formats) => {
  return (Array.isArray(formats) ? formats : [formats]).some(pattern => {
    let sanitizedInput = input
    let hasTimeZone = false

    /**
     * We don't care which timezone is used by the input date, but we need
     * to strip the timezone carefully and then format the date.
     *
     * 1. Timezone is only stripped when the date format expects timezone to
     *    be present.
     * 2. `Z` and `ZZ` identifiers replaces their expected counter parts.
     * 3. Also date can have `Z`, which is equivalent to `+01:00`.
     * 4. If we will not strip the timezone offset from the actual date, then
     *    dateFns will format it in local timezone causing invalid date
     *    comparison.
     * 5. Validation will also fail, when format expects a timezone but missing
     *    in original date.
     */
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
