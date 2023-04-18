import { SafeFactory } from '@safe-global/protocol-kit'
import { ethAdapter } from './EthersAdapater'

export const createSafeFactory = async () => {
  const safeFactory = await SafeFactory.create({ ethAdapter })
  return safeFactory
}
