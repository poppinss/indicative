import calcUnits from '../../lib/calcUnits'
import isAfter from './after'

export default (input, diffUnit, key) => {
  const expectedDate = calcUnits(diffUnit, key, '+')
  return expectedDate ? isAfter(input, expectedDate) : false
}
