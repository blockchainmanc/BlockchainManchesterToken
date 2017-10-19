const HumanStandardToken = artifacts.require(`./BlockchainManchesterToken.sol`)

module.exports = (deployer) => {
  deployer.deploy(HumanStandardToken)
}
