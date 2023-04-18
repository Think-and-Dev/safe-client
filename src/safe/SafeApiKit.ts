import SafeApiKit from '@safe-global/api-kit'
import { ethAdapter } from './EthersAdapater'
import { getTxServiceURL } from '../utils'

const txServiceUrl = getTxServiceURL()
export const safeService = new SafeApiKit({ txServiceUrl, ethAdapter })
