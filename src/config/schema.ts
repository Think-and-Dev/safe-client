import { z } from 'zod'

/** 
const safeTransactionData: SafeTransactionDataPartial = {
  to,
  data,
  value,
  operation, // Optional
  safeTxGas, // Optional
  baseGas, // Optional
  gasPrice, // Optional
  gasToken, // Optional
  refundReceiver, // Optional
  nonce // Optional
}
**/

export const SafeTransactionDataSchema = z.object({
  to: z.string(),
  data: z.string(),
  value: z.string()
})

export type SafeTransactionData = z.infer<typeof SafeTransactionDataSchema>
