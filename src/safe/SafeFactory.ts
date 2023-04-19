import { SafeFactory } from '@safe-global/protocol-kit'

export const createSafeFactory = async (adapter: any) => {
  const safeFactory = await SafeFactory.create({ ethAdapter: adapter })
  return safeFactory
}
