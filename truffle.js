// required to deploy to Ropsten - see README
let mnemonic = "";
let HDWalletProvider;

try {
    HDWalletProvider = require("truffle-hdwallet-provider");
    mnemonic = require("./mnemonic");
} catch (e) {
    console.warn("You require 'truffle-hdwallet-provider' lib and a local 'mnemonic.js' to deploy to Ropsten");
    console.log("Not required for local 'default' network\n\n");
}


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
