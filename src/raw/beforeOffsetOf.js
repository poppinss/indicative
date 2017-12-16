import calcUnits from '../../lib/calcUnits'
import isBefore from './before'

export default (input, diffUnit, key) => {
  const expectedDate = calcUnits(diffUnit, key, '-')
  return expectedDate ? isBefore(input, expectedDate) : false
}
