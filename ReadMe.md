# How to create a truffle project

I need to folders in my directory. First folder is the `React folder` that contains the frontend files and the second one is the `Truffle` folder which contains smart contracts.

# Installation

## React App

The front end of this application is created by using this template of react-redux in my github account: https://github.com/ThanasisNtatis/React_Redux_Eslint_Template

1. Create react app: `npx create-react-app my-app --template redux`
2. Change react-scripts in packagke.json to `4.0.3`
3. Set a new path for canisters that scopes to `build/contacts` directory: `"contracts": "file:../build/contracts",`
4. Install packages: `npm install`

Dependencies that are usefull for other blockchain application:

1. Install ethers: `npm i ethers`
2. Install jwt-decode: `npm i jwt-decode`
3. Install crypto-js for hashing pdf: `npm i crypto-js`
4. Communicate with our mongodb database with nodejs: `npm i axios`

Add in package.json for some errors:

```javascript
  "devDependencies": {
    "react-error-overlay": "^6.0.9"
  }
```

**IMPORTANT LINKS**

1. Sha256 pdf files before storing them in blockchain: https://www.youtube.com/watch?v=hVpP3nhnyVQ&t=356s

## Install Truffle

1. Create truffle project: `truffle init`
2. Compile canisters: `truffle compile`
3. Migrate canisters: `truffle migrate`

if first time:
truffle migrate --network matic

## Truffle-config.js file

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      //from: "0x09dc039Cc695386e5F900db651e4142acE2Be682",
    },
  },
  compilers: {
    solc: {
      version: "0.8.5",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

## Use Polygon Network

```javascript
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://rpc-mumbai.matic.today`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 35000000000,
    },
```

1. Create truffle project: `truffle init`
2. Compile canisters: `truffle compile`
3. Migrate canisters: `truffle migrate --network matic --reset`

**IMPORTANT LINKS**:

1. How to deploy on polygon network: https://www.youtube.com/watch?v=fzmW8IbstRY
2. Exaples with polygon and not only network: https://learn.figment.io/tutorials/deploying-and-debugging-smart-contracts-on-polygon

## Centralized Back End - Metamask Connection Signature

Some kind of applications should need a login with metamask in a centralized database. This application needs this kind of implementation.

1. Install all packages in backend folder: `npm install`
2. Start server with: `node server`

In `.env` file someone could find the API of my mongodb database that was created for this application.

On the other hand `server.js` enstablish the connection with that database.

**IMPORTANT LINKS**: https://github.com/amaurym/login-with-metamask-demo

# Import Ganache to Metamask

1. Open Ganache and get the information
2. Open Metamask
3. Choose add a network
4. Add RPC server of metamask
5. Add the chainId: `1337`
6. Click import account
7. Import private key from Ganache

# Deploy on real network

I could use just the Remix IDE and deploy my contract directly on polygon mainet. After that I could follow the link of the transaction and get the abi and the contract address.
<br/> Here we can share our code: https://mumbai.polygonscan.com/verifyContract
