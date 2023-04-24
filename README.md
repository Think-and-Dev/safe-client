# Safe-Client

- POC for Safe Multisig management from backend using Safe-SDK.

### Stack

- Node v18
- Typescript
- Express
- Ethers v5.x
- [TRPC](https://trpc.io/)

### Resources

- https://safe.global/core
- https://docs.safe.global/
- https://github.com/safe-global/safe-core-sdk/blob/main/guides/integrating-the-safe-core-sdk.md

---

### Install

```bash
nvm use
yarn
```

### Run server

```bash
yarn dev: server
```

### Endpoints

- Create transaction: Create Safe transaction. This will mean it will get proposed to the network.

- Get transaction: Get transaction details by knowing tx hash.

- Get pending transactions: Get all pending transactions.

- Confirm transaction: Accept a transaction. Fot that purpose a valid signer|owner of the safe must be provided.

- Postman collection could be found on /src/postman.

### Safe-SDK initialization

1. Create Ethers Adapter: You will have to provide a signer or provider to sign or view transactions from the SafeAPIKit.

```typescript
return new EthersAdapter({
  ethers,
  signerOrProvider: safeOwner
})
```

2. Create SafeAPIKit: Using the ethersAdapter and the Transaction Service URL you will initialize your safeService. For the complete list of the safe transction services url please refer to: https://docs.safe.global/learn/safe-core/safe-core-api/available-services

```typescript
const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: adapter })
```

3. Create Safe Factory:

```typescript
const safeFactory = await SafeFactory.create({ ethAdapter: adapter })
```

4. Initialize SafeSDK: Here you will need to provide your Safe public Address

```typescript
await Safe.create({
  ethAdapter: this.adapter,
  safeAddress: address
})
```

### Query request example with TRPC

- Get your input formatted where INPUT is a URI-encoded JSON string.

```javascript
const tRPC2 = encodeURIComponent(JSON.stringify('hola'))
```

```bash
curl --location 'localhost:2021/trpc/greet?input=%2522hola%2522'
```

---

ADD ON
Y GET OWNERS
