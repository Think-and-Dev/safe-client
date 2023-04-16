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
  createContext() {
    return {}
  }
}).listen(2022)
