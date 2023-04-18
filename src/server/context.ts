import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { createSafeFactory } from '../safe/SafeFactory'
import { inferAsyncReturnType } from '@trpc/server'

export const createContext = async (opts: CreateNextContextOptions) => {
  const safeFactory = await createSafeFactory()

  return {
    safeFactory
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
