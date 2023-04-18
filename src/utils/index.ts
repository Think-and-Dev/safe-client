import { safeTransactionServicesURLs } from '../constants'
import { NETWORKS } from '../constants'
import { providers } from '../constants'

export const getNetwork = (): NETWORKS => {
  if (!process.env.NETWORK_ENV) {
    throw Error('PLEASE PROVIDE A NETWORK ENV')
  } else {
    switch (process.env.NETWORK_ENV) {
      case 'MAINNET':
        return NETWORKS.MAINNET
      case 'POLYGON':
        return NETWORKS.POLYGON
      case 'MUMBAI':
        return NETWORKS.MUMBAI
      case 'GOERLI':
        return NETWORKS.GOERLI
      default:
        throw Error('INVALID NETWORK')
    }
  }
}

export const getProviderURL = (): string => {
  const network = getNetwork()
  //@ts-ignore
  const providerURL: string = providers[network].rpcUrl
  return providerURL
}

export const getTxServiceURL = (): string => {
  const network = getNetwork()
  //@ts-ignore
  return safeTransactionServicesURLs[network]
}
