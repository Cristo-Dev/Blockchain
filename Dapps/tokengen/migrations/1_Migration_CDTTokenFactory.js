const CDTTokenFactory = artifacts.require('CDTTokenFactory')

module.exports = (deployer) => {
    deployer.deploy(CDTTokenFactory, '')
}