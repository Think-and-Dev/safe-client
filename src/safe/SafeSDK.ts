import Safe from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import {
  GetPendingTransactionsOutput,
  GetTransactionInput,
  GetTransactionOutput,
  GetTransactionOutput2,
  SafeTransactionOutput
} from '../config/schema'
import { safeService } from '..'
import { TRPCError } from '@trpc/server'

export default class SafeSDK {
  private sdk: Safe | undefined
  private safeAddress: string | undefined
  private adapter: any
  static instance: SafeSDK

  private constructor() {}

  public static getInstance(): SafeSDK {
    if (!SafeSDK.instance) {
      SafeSDK.instance = new SafeSDK()
    }
    return SafeSDK.instance
  }

  public async initSDK(adapter: any, address: string) {
    this.adapter = adapter
    this.safeAddress = address
    this.sdk = await Safe.create({
      ethAdapter: this.adapter,
      safeAddress: address
    })
  }

  public async createTransaction(
    tx: SafeTransactionDataPartial,
    sender: string
  ): Promise<SafeTransactionOutput> {
    try {
      const transaction = await this.sdk!.createTransaction({
        safeTransactionData: tx
      })

      const txHash = await this.sdk!.getTransactionHash(transaction)
      const senderSignature = await this.sdk!.signTransactionHash(txHash)

      await safeService.proposeTransaction({
        safeAddress: this.safeAddress!,
        safeTransactionData: transaction.data,
        safeTxHash: txHash,
        senderAddress: sender,
        senderSignature: senderSignature.data
      })
      return {
        signer: sender,
        data: senderSignature.data,
        hash: txHash
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: JSON.stringify(error),
        message: 'Something went wrong when creating transaction'
      })
    }
  }

  public async getTransaction(txHash: GetTransactionInput): Promise<GetTransactionOutput> {
    try {
      const {
        safe,
        to,
        value,
        data,
        operation,
        gasToken,
        safeTxGas,
        baseGas,
        gasPrice,
        nonce,
        submissionDate,
        modified,
        transactionHash,
        safeTxHash,
        isExecuted,
        origin,
        confirmationsRequired
      } = await safeService.getTransaction(txHash.hash)

      return {
        safe,
        to,
        value,
        data,
        operation,
        gasToken,
        safeTxGas,
        baseGas,
        gasPrice,
        nonce,
        submissionDate,
        modified,
        transactionHash,
        safeTxHash,
        isExecuted,
        origin,
        confirmationsRequired
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: JSON.stringify(error),
        message: 'Something went wrong when retrieving transaction'
      })
    }
  }

  public async getPendingTransactions(): Promise<GetPendingTransactionsOutput> {
    try {
      const pendingTxs = await safeService.getPendingTransactions(this.safeAddress!)
      const count = pendingTxs.count
      const processedPendingTxs = pendingTxs.results.map((pendingTx) => {
        const { safe, to, value, data, safeTxHash } = pendingTx
        return { safe, to, value, data, safeTxHash }
      })
      return {
        count: count,
        results: processedPendingTxs
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: JSON.stringify(error),
        message: 'Something went wrong when retrieving pending transactions'
      })
    }
  }
}
