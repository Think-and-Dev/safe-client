import Safe from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import {
  ConfirmTransactionInput,
  GetPendingTransactionsOutput,
  GetTransactionInput,
  GetTransactionOutput,
  SafeTransactionOutput,
  ConfirmTransactionOutput,
  GetOwnersOutput
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

  public async confirmTransaction(
    input: ConfirmTransactionInput
  ): Promise<ConfirmTransactionOutput> {
    try {
      const transaction = await safeService.getTransaction(input.hash)
      const isValidTx = await this.sdk!.isValidTransaction(transaction)
      if (isValidTx) {
        const response = await this.sdk!.executeTransaction(transaction)
        const receipt = response.transactionResponse && (await response.transactionResponse.wait())
        return {
          hash: response.hash,
          nonce: response.transactionResponse?.nonce,
          to: receipt?.to,
          from: receipt?.to,
          blockNumber: receipt?.blockNumber,
          confirmations: receipt?.confirmations
        }
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: input.hash,
          message: 'Transaction is no longer valid'
        })
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: JSON.stringify(error),
        message: 'Something went wrong when confirming transaction'
      })
    }
  }

  public async getSafeOwners(): Promise<GetOwnersOutput> {
    const owners: string[] | undefined = await this.sdk?.getOwners()
    console.log('OWNERS')
    console.log(owners)
    if (owners) {
      return {
        count: owners.length,
        owners
      }
    } else {
      return {
        count: 0,
        owners: []
      }
    }
  }
}
