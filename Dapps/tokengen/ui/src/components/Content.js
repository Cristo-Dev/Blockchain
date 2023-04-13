import { Component } from 'react'
import {
    Container,
    Col,
    Row,
    Input,
    Spacer,
    Text,
    Dropdown,
    Button,
    Loading,
    Modal
} from '@nextui-org/react'
import CDTTokenFactoryContract from '../contracts/CDTTokenFactory'
import MDATokenFactory from '../factory/cdttokenfactory'
import TokenContract from '../contracts/CDTToken'
import TokenFactory from '../factory/tokenfactory'
import { Web3Instance } from '../services/web3Instance'
import { isConnected } from '../util/mda'
import Login from './Login'
import Logout from './icons/Logout'
import OpenLink from './icons/OpenLink'

const defaultTokenType = 'Token Type'
const defaultNetwork = 'Select Network'
const defaultPayment = 'Payment Token'


export default class Content extends Component {
    constructor(props) {
        super(props)
        this.InitialState = {
            mdaAllowance: 0,
            paidTokenAddress: undefined,
            paidTokenDecimals: undefined,
            account: undefined,
            displayAccount: undefined,
            deployedAddress: undefined,
            modalVisibility: false,
            modalDeployed: false,
            modalMessage: 'Token created successfully!',
            modalTitle: 'Token Creation',
            tokenName: '',
            tokenSymbol: '',
            tokenDecimals: '',
            tokenSupply: '',
            paymentToken: '',
            price: '0.00',
            tokenType: defaultTokenType,
            networkSymbol: '',
            network: defaultNetwork,
            payment: defaultPayment,
            loading: false,
            disabledNetworks: ['polygon', 'ethereum'],
            networksList: [
                { key: 'bsc', name: 'Binance Smart Chain' },
                { key: 'polygon', name: 'Polygon' },
                { key: 'ethereum', name: 'Ethereum' },
            ],
            paymentsList: [
                { key: 'bnb', name: `Pay with BNB/MATIC/ETH` },
                { key: 'cdt', name: 'Pay with CDT' }
            ],
            tokenTypesList: [
                { key: 'free', name: 'Basic ERC20 (Free)' },
                { key: 'standard', name: 'Standard ERC20' },
                { key: 'burnable', name: 'Burnable ERC20' },
                { key: 'mintable', name: 'Mintable ERC20' }
            ]
        }

        this.state = this.InitialState
    }

    render() {
        return <Container css={{ mt: 50 }} gap={1}>
            <Row css={{
                'border-bottom': 'solid gray 0.5px !important'
            }}>
                <Col>
                    <h3>
                        Detalles del Token<br />
                        <small className='details_text'>Introduce los detalles del token a crear</small>
                    </h3>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col>
                    <Text blockquote css={{ mb: '20px' }}>
                        <Row>
                            <Col>
                                Precio: {this.state.price} {' '}
                                {this.state.paymentToken}
                            </Col>
                            <Col>
                                <Button bordered size="sm" color="primary" onClick={() => this.state.displayAccount ? this.disconnect() : this.connect()}>
                                    {this.state.displayAccount ? <>{this.state.displayAccount} &nbsp;<Logout size={18} color="#0271f5" /></> : <>Conectarse</>}
                                </Button>
                            </Col>
                        </Row>
                    </Text>
                </Col>
            </Row>
            {
                isConnected() ?
                    <Row gap={1} css={{ mt: 50 }}>
                        <Col>
                            <Input
                                onChange={e => this.setState({
                                    tokenName: e.target.value
                                })}
                                helperText="Elige un nombre para tu token."
                                width="80%"
                                clearable
                                bordered
                                value={this.state.tokenName}
                                label="Nombre del Token *"
                                placeholder="MetaDapp Token" />
                            <Spacer y={1.5} />
                            <Input
                                onChange={e => this.setState({
                                    tokenSymbol: e.target.value
                                })}
                                helperText="Elige un símbolo para tu token (normalmente de 3 a 5 caracteres)."
                                width="80%"
                                clearable
                                bordered
                                value={this.state.tokenSymbol}
                                label="Símbolo del Token *"
                                placeholder="MDA" />
                            <Spacer y={1.5} />
                            <Input
                                onChange={e => this.setState({
                                    tokenDecimals: e.target.value
                                })}
                                helperText="Inserta el número de decimales de tu token, si no sabes qué poner, inserta 18."
                                width="80%"
                                clearable
                                bordered
                                type="number"
                                disabled={this.getTokenCode() === 0}
                                value={this.state.tokenDecimals}
                                label="Número de decimales del Token *"
                                placeholder="18" />
                            <Spacer y={1.5} />
                            <Input
                                onChange={e => this.setState({
                                    tokenSupply: e.target.value
                                })}
                                helperText="Inserta el suministro inicial de tu token, el cual se enviará a tu cuenta conectada."
                                width="80%"
                                bordered
                                type="number"
                                labelRight={this.state.tokenSymbol}
                                value={this.state.tokenSupply}
                                label="Supply del Token *"
                                placeholder="1,000,000,000" />
                        </Col>
                        <Col css={{ marginTop: '10%' }}>
                            <Row>
                                <Col>
                                    <Dropdown placement='left'>
                                        <Dropdown.Button flat>{this.state.tokenType}</Dropdown.Button>
                                        <Dropdown.Menu
                                            aria-label="Single selection actions"
                                            color="secondary"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={this.getItemKeyListByName(this.state.tokenTypesList, this.state.tokenType)}
                                            onSelectionChange={(e) => this.setState({
                                                tokenType: this.getItemNameByKey(this.state.tokenTypesList, e.currentKey)
                                            }, () => {
                                                this.setPrice()
                                            })}>
                                            {
                                                this.state.tokenTypesList.map((tokenType) => {
                                                    return <Dropdown.Item key={tokenType.key}>{tokenType.name}</Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown placement='left'>
                                        <Dropdown.Button flat>{this.state.network}</Dropdown.Button>
                                        <Dropdown.Menu
                                            aria-label="Single selection actions"
                                            color="secondary"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            disabledKeys={this.state.disabledNetworks}
                                            selectedKeys={this.getItemKeyListByName(this.state.networksList, this.state.network)}
                                            onSelectionChange={(e) => this.setState({
                                                payment: defaultPayment,
                                                network: this.getItemNameByKey(this.state.networksList, e.currentKey),
                                                networkSymbol: this.getNetworkSymbol(e.currentKey)
                                            }, () => {
                                                this.updatePaymentItem()
                                            })
                                            }>
                                            {
                                                this.state.networksList.map((network) => {
                                                    return <Dropdown.Item key={network.key}>{network.name}</Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown placement='left'>
                                        <Dropdown.Button
                                            disabled={this.state.network === defaultNetwork
                                                || this.state.tokenType.includes('Basic')
                                                || this.state.tokenType.includes('Tipo')}
                                            flat>{this.state.payment}</Dropdown.Button>
                                        <Dropdown.Menu
                                            aria-label="Single selection actions"
                                            color="secondary"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={this.getItemKeyListByName(this.state.paymentsList, this.state.payment)}
                                            onSelectionChange={(e) => this.setState({
                                                payment: this.getItemNameByKey(this.state.paymentsList, e.currentKey)
                                            }, () => {
                                                this.updatePaymentItem()
                                                this.setPrice()
                                            })}>
                                            {
                                                this.state.paymentsList.map((payment) => {
                                                    return <Dropdown.Item key={payment.key}>{payment.name}</Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Spacer y={1.2} />
                            {
                                this.isFormValidated()
                                    ? this.getApproveOrCreateButton()
                                    : <Button disabled css={{ marginLeft: '25%' }} bordered size="xl" color="primary">CREAR TOKEN</Button>
                            }
                        </Col>
                    </Row> :
                    <Login />
            }
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={this.state.modalVisibility}
                onClose={() => this.closeHandler()}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        <Text b size={20}>
                            {this.state.modalTitle}
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text size={15}>{this.state.modalMessage}</Text>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.modalDeployed ?
                            <Button auto flat onClick={() => this.openExplorer()}>
                                Ver Token &nbsp;<OpenLink size={18} color="#0271f5" />
                            </Button> :
                            <Button auto flat onClick={() => this.closeHandler()}>
                                Ok
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </Container>
    }
}


