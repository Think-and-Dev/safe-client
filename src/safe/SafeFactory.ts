import { SafeFactory } from '@safe-global/protocol-kit'
import { ethAdapter } from './EthersAdapater'

export const createSafeFactory = async () => {
  console.log('ETH ADAPTER')
  console.log(ethAdapter)
  const safeFactory = await SafeFactory.create({ ethAdapter })
  console.log('ACA TIRAR ERROR')
  return safeFactory
}
