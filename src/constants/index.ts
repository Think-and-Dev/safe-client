export const MAINNET_EXPLORER = process.env.MAINNET_EXPLORER_URL || 'https://etherscan.io/'
export const GOERLI_EXPLORER = process.env.GOERLI_EXPLORER_URL || 'https://goerli.etherscan.io'
export const MUMBAI_EXPLORER = process.env.MUMBAI_EXPLORER || 'https://mumbai.polygonscan.com/'
export const POLYGON_EXPLORER = process.env.POLYGON_EXPLORER || 'https://polygonscan.com/'

export const NETWORK_NAMES = new Map([
  [1, 'Mainnet'],
  [5, 'Goerli'],
  [137, 'Polygon Mainnet'],
  [80001, 'Mumbai']
])

export const providers = {
  1: {
    chainName: 'Ethereum',
    chainId: '0x1',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrl: process.env.MAINNET_RPC_URL ? process.env.MAINNET_RPC_URL : 'https://rpc.ankr.com/eth'
  },
  137: {
    chainName: 'Polygon Mainnet',
    chainId: '0x89',
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    rpcUrl: process.env.POLYGON_RPC_URL ? process.env.POLYGON_RPC_URL : 'https://polygon-rpc.com/'
  },
  5: {
    chaiName: 'Goerli',
    chainId: '0x5',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrl: process.env.GOERLI_RPC_URL
      ? process.env.GOERLI_RPC_URL
      : 'https://goerli.blockpi.network/v1/rpc/public'
  },
  80001: {
    chainName: 'Mumbai',
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
  1: 'https://safe-transaction-mainnet.safe.global/',
  5: 'https://safe-transaction-goerli.safe.global/',
  137: 'https://safe-transaction-polygon.safe.global/'
}
