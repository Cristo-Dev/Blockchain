const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')
module.exports = {
    contracts_build_directory: path.join(__dirname, "client/src/contracts"), // Aqui se guarda el json de funciones

    networks:{
        plugins: [ //truffle run verify CristoDapp --network --bsc_testnet
            'truffle-plugin-verify'
        ],
        api_keys: {
            bscscan: ''
        },

        development:{
            host: '127.0.0.1',
            port: 7545,
            network_id: "*"
        },
        bsc_testnet: {
            provider: () => new HDWalletProvider(
                '',
                `https://data-seed-prebsc-1-s1.binance.org:8545`, 0),
            from: "",
            gas: "4500000",
            gasPrice: "10000000000",
            network_id: 97,
            confirmations: 4,
            timeoutBlocks: 10000,
            skipDryRun: true
        }
    },

    compilers: {
        solc: {
            version: "0.8.0"
        }
    }

}
