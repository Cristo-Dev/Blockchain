const CristoDappToken = artifacts.require('CristoDappToken')

module.exports = function (deployer) {
    deployer.deploy(CristoDappToken)
}