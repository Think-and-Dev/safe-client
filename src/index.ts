import { createSafeFactory } from './safe/SafeFactory'
import { router, publicProcedure } from './server/trpc'
import { createHTTPServer } from '@trpc/server/adapters/standalone'

export type AppRouter = typeof appRouter

const appRouter = router({
  greet: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query(({ input }) => ({ greeting: `hello, ${input}!` }))
})

createHTTPServer({
  router: appRouter,
  async createContext() {
    const safeFactory = await createSafeFactory()
    return {
      safeFactory
    }
  }
}).listen(2022)
