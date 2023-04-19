import Safe from '@safe-global/protocol-kit'

export default class SafeSDK {
  private sdk: any
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
    this.sdk = await Safe.create({
      ethAdapter: this.adapter,
      safeAddress: address
    })
  }

  public async createTransaction() {}

  public async multiSendTransaction() {}
}
