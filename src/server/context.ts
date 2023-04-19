import { createSafeFactory } from '../safe/SafeFactory'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { getAdapter } from '../safe/EthersAdapater'

/** 
export const createContext = async (opts: CreateNextContextOptions) => {
  const safeFactory = await createSafeFactory()

  return {
    safeFactory
  }
}
*/

// created for each request
export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return { message: 'HOLA' }
}

export type Context = inferAsyncReturnType<typeof createContext>
