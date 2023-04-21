# Safe-Client

- POC for Safe Multisig management from backend using Safe-SDK.

### Stack

- Typescript
- Express
- [TRPC]()

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

-

### Query request example with TRPC

- Get your input formatted where INPUT is a URI-encoded JSON string.

```javascript
const tRPC2 = encodeURIComponent(JSON.stringify('hola'))
```

```bash
curl --location 'localhost:2021/trpc/greet?input=%2522hola%2522'
```
