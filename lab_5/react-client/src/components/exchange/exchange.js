import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import ExchangeDetails from "../exchange-details"
import "./exchange.css"

export default class Exchange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showExchangeDetailsModal: false,
            stocks: {
                "Date": "11/04/2022",
                "Quotes": [
                    { 
                        "Label": "AAPL",
                        "Open": "142.09"
                    },
                    { 
                        "Label": "SBUX",
                        "Open": "143.11"
                    },
                    { 
                        "Label": "MSFT",
                        "Open": "145.15"
                    },
                ]
            }
        }

        this.openExchangeDetailsModal = this.openExchangeDetailsModal.bind(this)
        this.hideExchangeDetailsModal = this.hideExchangeDetailsModal.bind(this)
    }

    openExchangeDetailsModal () {
        this.setState({
            showExchangeDetailsModal: true
        })
    }

    hideExchangeDetailsModal () {
        this.setState({
            showExchangeDetailsModal: false
        })
    }

    render() {
        return (
            <div className="exchange-page">
                <div className="exchange-header">
                    <h4 className="exchange-headline">Настройки биржи</h4>
                    <div className="exchange-controls">
                        <Button variant="success" type="submit">
                            Запустить торги
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit"
                            onClick={this.openExchangeDetailsModal}
                        >
                            Открыть окно торгов
                        </Button>
                    </div>
                </div>
                <div className="exchange-divider"/>
                <Form className="exchange-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Статус биржи</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Статус биржи" 
                            defaultValue={"Ожидается запуск продаж"}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            Чтобы запустить продажи, добавьте акции в процесс и нажмите на кнопку "Запустить торги"
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Дата начала торгов</Form.Label>
                        <Form.Control type="date" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Частота обновления</Form.Label>
                        <Form.Control type="text" placeholder="Частота обновления в секундах" />
                    </Form.Group>
                </Form>
                <ExchangeDetails 
                    show={this.state.showExchangeDetailsModal}
                    hide={this.hideExchangeDetailsModal}
                    stocks={this.state.stocks}
                />
            </div>
        )
    }
}