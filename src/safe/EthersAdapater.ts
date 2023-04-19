import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { getProviderURL } from '../utils'
import { EthAdapter } from '@safe-global/safe-core-sdk-types'

const providerURL = getProviderURL()
const provider = new ethers.providers.AlchemyProvider('goerli', 'RkWmMzfkiw5U2w7rehINeymfAb6lT4ho')

if (!process.env.PRIVATE_KEY) {
  throw new Error('PLEASE PROVIDE A VALID PRIVATE_KEY')
}

console.log(provider)
const safeOwner: ethers.Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

export const ethAdapter: EthAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: safeOwner
})
