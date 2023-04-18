import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { getProviderURL } from '../utils'
import { EthAdapter } from '@safe-global/safe-core-sdk-types'

const providerURL = getProviderURL()
const provider = new ethers.JsonRpcProvider(providerURL)
const safeOwner = provider.getSigner(0)

export const ethAdapter: EthAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: safeOwner
})
