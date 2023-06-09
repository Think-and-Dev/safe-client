import { inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

// created for each request
export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>
