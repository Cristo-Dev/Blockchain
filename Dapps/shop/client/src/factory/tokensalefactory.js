export default class tokensalefactory{
    constructor(contract){ // recibe la instancia del contrato y la vincula a una variable
        this.contract = contract
    }
    async _isOwner(from) {
        return await this.contract.__isOwner({ from }) // el from es para saber que le estamos pasando información relacionada en el json
    }
    async _tokensSold() {
        return (await this.contract.tokensSold()).toNumber()
    }

    async _totalTokens() {
        return (await this.contract.totalTokens()).toNumber()
    }

    async _endSale(from) {
        return await this.contract.endSale({ from })
    }

    async _buy(from, bnbAmount, tokens) {
        return await this.contract.buy(tokens, { from, value: _bnbToWei(bnbAmount) })
    }

    async _tokens(from) {
        return (await this.contract.__tokens({ from })).toNumber()
    }

    async _tokenPrice() {
        return _weiToBNB((await this.contract.__tokenPrice()).toNumber())
    }

    async _priceChangePercent() {
        return 0
    }
    async _phase(phase_id) {
        let phase = await this.contract.phase(phase_id)

        return {
            total: phase.total,
            price: phase.price,
            phase: phase.phase
        }
    }
    async _phases() {
        let phases = await this.contract.__phases()
        return this.mapPhases(phases)
    }

    mapPhases(phases) {
        return phases.map((phase, phase_id) => {
            return {
                total: phase.total,
                price: phase.price,
                phase: phase.phase
            }
        })
    }
}