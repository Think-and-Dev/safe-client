import { z } from 'zod'

/**
 * --------------------------- USER SCHEMAS ---------------------------
 */

export const UserSchema = z.object({
  id: z.string(),
  nonce: z.string(),
  publicAddress: z.string()
})

export type User = z.infer<typeof UserSchema>

export const FindUserInputSchema = z.object({
  publicAddress: z.string()
})

export type FindUserInput = z.infer<typeof FindUserInputSchema>

export const FindUserOutputSchema = UserSchema

export type FindUserOutput = z.infer<typeof FindUserOutputSchema>
