## Car Marketplace Dapp
This is a car marketplace Dapp that uses IPFS technology to host the photos of the vehicles. With this Dapp, users can search and post car ads, contact sellers, and securely and transparently close purchase-sale deals.

The use of IPFS technology ensures that vehicle photos are stored in a decentralized manner and cannot be modified or deleted once uploaded to the network. This way, the integrity of the information is ensured and any kind of manipulation or fraud is avoided.

In addition, this Dapp uses smart contracts to guarantee security and transparency in purchase-sale agreements. The contracts are designed so that all parties involved in the transaction are protected and the agreed terms and conditions are fulfilled.

---

## Installation and Configuration

To proceed with the project, it is recommended that you have `npm` and `truffle` downloaded. You can download them from the following links:
- Download `npm` here: [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- Download `truffle` here: [https://www.trufflesuite.com/docs/truffle/getting-started/installation](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

Once you have cloned the repository, you must install the dependencies with the following command in the terminal:
```sh
npm install
```
Remember that to deploy the contracts with `truffle`, you must use the following command in the terminal:
```sh
truffle migrate --network developer
```
After deploying the contracts, move the already deployed contracts to the no_migrate folder. To do this, simply drag and drop the files into the no_migrate folder or use the mv command in the terminal.

>*It is necessary to fill in truffle.config with your data to be able to deploy the contracts on the desired network.*

Finally, download the client dependencies again with the following command in the terminal:
```sh
npm install
```
And to run it, use the following command:
```sh
npm start
```
## Contributing

If you would like to contribute to this project, we would love your help! Here are the steps to follow:

1. Fork the repository and clone it locally.
2. Install the dependencies with `npm install`.
3. Make your changes.
4. Test your changes with `npm test`.
5. Submit a pull request.

Before submitting a pull request, please ensure that your code follows the existing code style and passes the linting checks. Also, make sure to include tests for your changes.

Thank you for considering contributing to our project!







