import { config } from './config'
import existy from '../raw/existy'

/**
 * Uses config `EXISTY_STRICT` value to find if a field
 * value is skippable for validation or not
 */
export default (value: any): boolean => {
  return config.EXISTY_STRICT ? value === undefined : !existy(value)
}
