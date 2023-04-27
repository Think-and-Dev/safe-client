import { initTRPC } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import { Context } from './context'

const t = initTRPC.meta<OpenApiMeta>().context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
