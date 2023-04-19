import SafeApiKit from '@safe-global/api-kit'
import { getTxServiceURL } from '../utils'

export const getSafeService = (adapter: any) => {
  const txServiceUrl = getTxServiceURL()
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: adapter })
  return safeService
}
