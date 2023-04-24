import { generateOpenApiDocument } from 'trpc-openapi'

import { appRouter } from '../index'

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Safe Client OpenAPI',
  description: 'OpenApi compliant REST API built using tRPC with Express',
  version: '1.0.0',
  baseUrl: 'http://localhost:2021/safe'
})
