import express from 'express'
import { z } from 'zod'
import * as trpcExpress from '@trpc/server/adapters/express'
import { createOpenApiExpressMiddleware } from 'trpc-openapi'
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
  GetPendingTransactionOutputSchema,
  ConfirmTransactionSchema,
  ConfirmTransactionOutputSchema,
  GetOwnersOutputSchema
} from './config/schema'

export const appRouter = router({
  health: publicProcedure
    .meta({
      openapi: {
        path: '/ping_health',
        method: 'GET',
        tags: ['SAFE']
      }
    })
    .input(z.void())
    .output(
      z.object({
        id: z.string(),
        message: z.string()
      })
    )
    .query(() => {
      return {
        id: '200',
        message: `Hello Safe Backend`
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
    .input(z.void()) // no input expected
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
    .input(ConfirmTransactionSchema)
    .output(ConfirmTransactionOutputSchema)
    .mutation(async ({ input }) => {
      const sdk = SafeSDK.getInstance()
      return sdk.confirmTransaction(input)
    }),

  getOwners: publicProcedure
    .meta({
      openapi: {
        path: '/owners',
        method: 'GET',
        description: 'Get Safe Owners',
        tags: ['SAFE'],
        protect: false,
        summary: 'Get Safe Owners'
      }
    })
    .input(z.void())
    .output(GetOwnersOutputSchema)
    .query(async ({}) => {
      const sdk = SafeSDK.getInstance()
      return sdk.getSafeOwners()
    })
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
    '/safe/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )

  app.use(
    '/safe',
    createOpenApiExpressMiddleware({
      router: appRouter,
      createContext
    })
  )

  app.listen(2021, () => {
    console.log('listening on port 2021')
  })
}

export type AppRouter = typeof appRouter

server()
