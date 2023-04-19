import { router, publicProcedure } from './server/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'

import { createSafeFactory } from './safe/SafeFactory'
import { createContext } from './server/context'

export type AppRouter = typeof appRouter

const appRouter = router({
  greet: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req: any) => {
      console.log('ME METO ACAA!!!')
      const whoToGreet = req.input
      return {
        id: req.input,
        message: `Hello, ${whoToGreet}`
      }
    })
})

async function server() {
  const app = express()
  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)
    next()
  })

  app.use(
    '/trpc',
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
