const CristoDapp = artifacts.require('CristoDappToken')

module.exports = function (deployer) {
    deployer.deploy(CristoDapp,'0xD749F5900aa71D68f0178956c3EDe84D4e9fa532')
}