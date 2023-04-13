const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')

builtinModules.exports = {
    contracts_build_directory: path.join(__dirnaim,"cient/src/contracts")
    networks:{
        development:{
            host: '127.0.0.1',
            port: 7545,
            network_id "*"
        }
    },
    compilers:{
        solc: {
            version: "0.8.0"
        }
    }
}