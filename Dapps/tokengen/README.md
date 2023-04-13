## Token Generator Dapp
This is a Dapp that allows users to generate tokens in just a few seconds. With this Dapp, users can create any type of token they want on the BSC and Ethereum networks, and soon on the Polygon network as well.

Using this Dapp, users can specify the name, symbol, total supply, decimal places, and other details of their tokens. Once the token is created, it can be used for a variety of purposes, such as crowdfunding, loyalty programs, or as a payment method for goods and services.

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







