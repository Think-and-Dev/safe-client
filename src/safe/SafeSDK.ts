import Safe from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { safeService } from '..'

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

  public async createTransaction(tx: SafeTransactionDataPartial, sender: string) {
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
        senderSignature: senderSignature.data,
        origin
      })
    } catch (error) {
      console.log('ERROR')
      console.log(error)
      throw new Error(
        JSON.stringify({
          msg: 'Error Creating transaction',
          error
        })
      )
    }
  }

  public async getTransaction(txHash: string) {
    const tx = await safeService.getTransaction(safeTxHash)
  }

  public async getPendingTransactions() {
    const pendingTxs = await safeService.getPendingTransactions(this.safeAddress!)
    console.log(pendingTxs)
  }
}
