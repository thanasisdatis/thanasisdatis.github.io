const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config(); // Load .env file

module.exports = {
  networks: {
    // For Ganache, your personal blockchain
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port
      network_id: "*", // Any network (default: none)
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          //`https://rpc-mumbai.maticvigil.com/v1/93ee9638846470ff6c346e111a50bdd85a076961`
          `https://rpc-mumbai.maticvigil.com/`
        ),
      network_id: 80001,
      confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 35000000000,
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

// "5777": {
//   "events": {},
//   "links": {},
//   "address": "0x9dB29324edda3C631A3BdFEEC3F53E97B2243bB3",
//   "transactionHash": "0x9a4a504f961cf6a30e0297b62b88a17761960f7984cf85451f7cd61132e42c56"
// },

// /`https://speedy-nodes-nyc.moralis.io/2419483b209f2dd68775d17e/polygon/mumbai`
//           //`https://rpc-mumbai.matic.today`
//           //`https://matic-mumbai.chainstacklabs.com`
//           `https://rpc-mumbai.maticvigil.com/`
