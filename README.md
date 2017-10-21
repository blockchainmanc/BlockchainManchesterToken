# Blockchain Manchester Token

This code is a modified version of the excellent work in the [ConsenSys](https://consensys.net/) repository:
 [Tokens](https://github.com/ConsenSys/Tokens)

This repo contains a Solidity smart contract to issue a simple, standards-compliant [ERC20](https://blockgeeks.com/guides/ethereum-token/) token on Ethereum. 

Theoretically, It can be modified and extended to suit any purpose. 

The smart contract is called [BlockchainManchesterToken.sol](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol) which defines the the core ERC20 standard functionality [#20](https://github.com/ethereum/EIPs/issues/20).  

[BlockchainManchesterToken](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol) is an example of a token to be mainly used by other humans (to exchange tokens). 

It includes:  

1. Predefined [finite](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol#L47) supply hardcoded on creation.  
2. Predefined [Decimal](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol#L56), [Symbol](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol#L57) & [Name](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol#L55) parameters (hardcoded).  

There is a set of tests written for the [BlockchainManchesterToken.sol](https://github.com/blockchainmanc/BlockchainManchesterToken/blob/master/contracts/BlockchainManchesterToken.sol) using the Truffle framework (3.x).

[ERC-20](https://github.com/ethereum/EIPs/issues/20) Standards allows other contract developers and wallets to interact, use, and display this token. 

## Deployed instances

**Ropsten** Contract adddress: [0x39e0a1c614281c6c2438c8864a7b76a072579c6b](https://ropsten.etherscan.io/token/0x39e0a1c614281c6c2438c8864a7b76a072579c6b)

**Main Ethereum Blockchain** Contract address [0xde8493067d5c68ea7c2e6dc347ad2ae68ece09e3](https://etherscan.io/token/0xde8493067d5c68ea7c2e6dc347ad2ae68ece09e3)

## Smart Contract ABI (Interface)

```
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
```

## Install

Uses Truffle 3.x. (globally)
```
npm install truffle -g
```

Requires Node > 0.7.x (and npm) (globally)

```
npm install
```

Create a `mnemonic` file at the root of the project
```
touch mnemonic.js
```

## Deployment (via Truffle)

To work locally  you will need a running instance of [testrpc](https://github.com/ethereumjs/testrpc).

To install `testrpc`
```
npm install -g ethereumjs-testrpc
```
* Once running lauch `testrpc` in a new shell

Deploying locally (to network: default):
```
truffle migrate
```

## Testing

```
truffle test
```

To deploy to the Ropsten test chain, you will need to add javascript file called `mnemonic.js` in the root of the project with your mnemonic seed (that has credit in the coinbase account).

* Creating a test coinbase account on the test network Ropsten
  * Create a MetaMask account OR Ehterum Wallet account ensuring you are on the Ropsten test network
  * Source it with test Ether so we have some [Gas](https://www.cryptocompare.com/coins/guides/what-is-the-gas-in-ethereum/)
    * MetaMask test Ether https://faucet.metamask.io/
    * Ethereum Wallet test Ether http://faucet.ropsten.be:3001/
  * Update the `mnemonic.js` with your test network seed that now should have some test Gas

The `mnemonic.js` should be like so (but with your mnemonic seed):
```
module.exports = "bottle alley hunt acid hello limb matter robust tiger salad educate coffee";
```

Deploying remotely (to Ropsten, for example):
```
truffle migrate --network ropsten
```

Once deployed it will look something like this:
```bash
truffle migrate --network ropsten
Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x000000000000000000000000000000000000000000000000000000000000000
  Migrations: 0x0000000000000000000000000000000000000
Saving successful migration to network...
  ... 0x000000000000000000000000000000000000000000000000000000000000000
Saving artifacts...
Running migration: 2_deploy_tokens.js
  Deploying BlockchainManchesterToken...
  ... 0x000000000000000000000000000000000000000000000000000000000000000
  BlockchainManchesterToken: 0x0000000000000000000000000000000000000000
Saving successful migration to network...
  ... 0x000000000000000000000000000000000000000000000000000000000000000
Saving artifacts...
```

### Licensed under MIT.  

This code is licensed under MIT.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
