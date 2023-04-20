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
  status: z.string(),
  message: z.string()
})

export type SafeTransactionOutput = z.infer<typeof SafeTransactionOutputSchema>
