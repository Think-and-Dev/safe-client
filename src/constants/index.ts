export const MAINNET_EXPLORER = process.env.MAINNET_EXPLORER_URL || 'https://etherscan.io/'
export const GOERLI_EXPLORER = process.env.GOERLI_EXPLORER_URL || 'https://goerli.etherscan.io'
export const MUMBAI_EXPLORER = process.env.MUMBAI_EXPLORER || 'https://mumbai.polygonscan.com/'
export const POLYGON_EXPLORER = process.env.POLYGON_EXPLORER || 'https://polygonscan.com/'

export enum NETWORKS {
  MAINNET = 'MAINNET',
  GOERLI = 'GOERLI',
  MUMBAI = 'MUMBAI',
  POLYGON = 'POLYGON'
}

export const NETWORK_NAMES = new Map([
  ['Mainnet', 1],
  ['Goerli', 5],
  ['Polygon Mainnet', 137],
  ['Mumbai', 80001]
])

export const providers = {
  MAINNET: {
    chainName: 'ethereum',
    chainId: '0x1',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrl: process.env.MAINNET_RPC_URL ? process.env.MAINNET_RPC_URL : 'https://rpc.ankr.com/eth'
  },
  POLYGON: {
    chainName: 'polygon',
    chainId: '0x89',
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    rpcUrl: process.env.POLYGON_RPC_URL ? process.env.POLYGON_RPC_URL : 'https://polygon-rpc.com/'
  },
  GOERLI: {
    chaiName: 'goerli',
    chainId: '0x5',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrl: process.env.GOERLI_RPC_URL
      ? process.env.GOERLI_RPC_URL
      : 'https://goerli.blockpi.network/v1/rpc/public'
  },
  MUMBAI: {
    chainName: 'mumbai',
    chainId: '0x13881',
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    rpcUrl: process.env.MUMBAI_RPC_URL
      ? process.env.MUMBAI_RPC_URL
      : 'https://rpc-mumbai.maticvigil.com/'
  }
}

/**
 * https://docs.safe.global/learn/safe-core/safe-core-api/available-services
 */
export const safeTransactionServicesURLs = {
  MAINNET: 'https://safe-transaction-mainnet.safe.global/',
  GOERLI: 'https://safe-transaction-goerli.safe.global/',
  POLYGON: 'https://safe-transaction-polygon.safe.global/'
}
