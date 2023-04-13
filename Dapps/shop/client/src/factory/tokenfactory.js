export default class tokenfactory{
    constructor(contract){ // recibe la instancia del contrato y la vincula a una variable
        this.contract = contract
    }
    async _approve(spender, amount, from) {
        return await this.contract.approve(spender, amount, { from }) // se coecta a la función del contrato
    }

    async _allowance(owner, spender) {
        return await this.contract.allowance(owner, spender, { from: owner })// se coecta a la función del contrato
    }

    async _symbol() {
        return await this.contract.symbol()// se coecta a la función del contracto
    }
}