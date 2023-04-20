import { safeTransactionServicesURLs } from '../constants'
import { NETWORKS } from '../constants'
import { providers } from '../constants'

export const getNetwork = (): NETWORKS => {
  if (!process.env.NETWORK_ENV) {
    throw Error('PLEASE PROVIDE A NETWORK ENV')
  } else {
    const network = NETWORKS[process.env.NETWORK_ENV as string]
    if (!network) {
      throw Error('PLEASE PROVIDE A VALID NETWORK')
    }
    return network
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
