import { z } from 'zod'

export const SafeTransactionDataSchema = z.object({
  to: z.string(),
  data: z.string(),
  value: z.string(),
  sender: z.string(),
  safeTxGas: z.number().optional(),
  baseGas: z.number().optional(),
  gasPrice: z.number().optional(),
  gasToken: z.string().optional(),
  refundReceiver: z.string().optional(),
  nonce: z.number().optional()
})

export type SafeTransactionInput = z.infer<typeof SafeTransactionDataSchema>

export const SafeTransactionOutputSchema = z.object({
  signer: z.string(),
  data: z.string(),
  hash: z.string()
})

export type SafeTransactionOutput = z.infer<typeof SafeTransactionOutputSchema>

export const GetTransactionSchema = z.object({
  hash: z.string()
})

export type GetTransactionInput = z.infer<typeof GetTransactionSchema>

export const GetTransactionOutputSchema = z.object({
  safe: z.string(),
  to: z.string(),
  value: z.string(),
  data: z.any(),
  operation: z.number(),
  gasToken: z.string(),
  safeTxGas: z.number(),
  baseGas: z.number(),
  gasPrice: z.string(),
  nonce: z.number(),
  submissionDate: z.string(),
  modified: z.string(),
  transactionHash: z.any(),
  safeTxHash: z.string(),
  isExecuted: z.boolean(),
  origin: z.string(),
  confirmationsRequired: z.number()
})

export type GetTransactionOutput = z.infer<typeof GetTransactionOutputSchema>

export const GetTransactionOutputSchema2 = z.object({
  status: z.string(),
  message: z.string()
})

export type GetTransactionOutput2 = z.infer<typeof GetTransactionOutputSchema2>

export const GetPendingTransactionOutputSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      safe: z.string(),
      to: z.string(),
      value: z.string(),
      data: z.any(),
      safeTxHash: z.string()
    })
  )
})

export type GetPendingTransactionsOutput = z.infer<typeof GetPendingTransactionOutputSchema>
