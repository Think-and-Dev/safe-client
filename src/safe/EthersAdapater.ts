import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { getNetwork } from '../utils'

export const getAdapter = () => {
  const network = getNetwork()

  if (!process.env.ALCHEMY_KEY) {
    throw new Error('PLEASE PROVIDE A VALID ALCHEMY KEY')
  }

  const provider = new ethers.providers.AlchemyProvider(
    network.toLowerCase(),
    process.env.ALCHEMY_KEY
  )

  if (!process.env.PRIVATE_KEY) {
    throw new Error('PLEASE PROVIDE A VALID PRIVATE_KEY')
  }

  const safeOwner: ethers.Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  return new EthersAdapter({
    ethers,
    signerOrProvider: safeOwner
  })
}
