import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'

import { router, publicProcedure } from './server/trpc'
import { createContext } from './server/context'
import { getAdapter } from './safe/EthersAdapater'
import { getSafeService } from './safe/SafeApiKit'
import { createSafeFactory } from './safe/SafeFactory'
import SafeSDK from './safe/SafeSDK'

import {
  SafeTransactionDataSchema,
  SafeTransactionOutputSchema,
  GetTransactionSchema,
  GetTransactionOutputSchema,
  GetTransactionOutputSchema2,
  GetPendingTransactionOutputSchema
} from './config/schema'

export type AppRouter = typeof appRouter

const appRouter = router({
  greet: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req: any) => {
      const whoToGreet = req.input
      return {
        id: req.input,
        message: `Hello, ${whoToGreet}`
      }
    }),

  createTransaction: publicProcedure
    .meta({
      openapi: {
        path: '/transaction',
        method: 'POST',
        description: 'Create Safe Transaction',
        tags: ['SAFE'],
        protect: false,
        summary: 'Create Safe Transaction'
      }
    })
    .input(SafeTransactionDataSchema)
    .output(SafeTransactionOutputSchema)
    .mutation(async ({ input }) => {
      const sdk = SafeSDK.getInstance()
      return sdk.createTransaction(input, input.sender)
    }),

  getTransaction: publicProcedure
    .meta({
      openapi: {
        path: '/transaction',
        method: 'GET',
        description: 'Get transaction',
        tags: ['SAFE'],
        protect: false,
        summary: 'Get transaction by tx hash'
      }
    })
    .input(GetTransactionSchema)
    .output(GetTransactionOutputSchema)
    .query(async ({ input }) => {
      const sdk = SafeSDK.getInstance()
      return sdk.getTransaction(input)
    }),

  getPendingTransactions: publicProcedure
    .meta({
      openapi: {
        path: '/pending-transactions',
        method: 'GET',
        description: 'Get Pending Transactions',
        tags: ['SAFE'],
        protect: false,
        summary: 'Get pending transactions'
      }
    })
    .output(GetPendingTransactionOutputSchema)
    .query(() => {
      const sdk = SafeSDK.getInstance()
      return sdk.getPendingTransactions()
    }),

  confirmTransaction: publicProcedure
    .meta({
      openapi: {
        path: '/transaction/confirm',
        method: 'POST',
        description: 'Confirm transaction',
        tags: ['SAFE'],
        protect: false,
        summary: 'Confirm transaction'
      }
    })
    .input()
    .output()
    .mutation()

  /** 
  rejectTransaction: publicProcedure
    .meta({
      openapi: {
        path: '/safe/transaction',
        method: 'POST',
        description: 'Create Safe Transaction',
        tags: ['SAFE'],
        protect: false,
        summary: 'Create Safe Transaction'
      }
    })
    .input()
    .output()
    .mutation()
**/
})

export const adapter = getAdapter()
export const safeService = getSafeService(adapter)
export const safeFactory = createSafeFactory(adapter)
export const safeSDK = SafeSDK.getInstance()

async function server() {
  if (!process.env.SAFE_ADDRESS) {
    throw new Error('PLEASE PROVIDE A SAFE ADDRESS')
  }
  await safeSDK.initSDK(adapter, process.env.SAFE_ADDRESS)

  const app = express()

  app.use((req, _res, next) => {
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)
    next()
  })

  app.use(
    '/safe',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )

  app.get('/', (_req, res) => res.send('hello'))

  app.listen(2021, () => {
    console.log('listening on port 2021')
  })
}

server()
