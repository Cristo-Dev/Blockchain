const MDAToken = artifacts.require('CDTToken')

module.exports = (deployer) => {
    deployer.deploy(CDTToken)
}