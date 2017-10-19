const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require("./mnemonic");

module.exports = {
    "networks": {
        "live": {
            "network_id": 1 // Ethereum public network
      // optional config values
      // host - defaults to "localhost"
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
        },
        "ropsten": {
            "provider": new HDWalletProvider(mnemonic, "https://ropsten.infura.io"),
            "network_id": "3"
        },
        "testrpc": {
            "network_id": "default"
        },
        "development": { // truffle test hardcodes the "test" network.
            "host": "localhost",
            "port": "8545",
            "network_id": "default"
        }
    }
};
