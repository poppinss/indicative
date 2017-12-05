import ipv4 from './ipv4'
import ipv6 from './ipv6'
export default (input) => ipv4(input) || ipv6(input)
