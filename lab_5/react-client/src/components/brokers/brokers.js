import { Component } from "react"
import { Button } from "react-bootstrap"
import "./brokers.css"

import Broker from "../broker";
import NewBroker from "../new-broker";
import BrokerDetails from "../broker-details";

const dumpBrokers = [
    {
        "id": 1,
        "name": "Mikhail Astashonak",
        "email": "thenaitrise@gmail.com",
        "password": "12345",
        "balance": 300,
        "stocks": []
    },
    {
        "id": 2,
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "password": "12345",
        "balance": 200,
        "stocks": []
    },
    {
        "id": 3,
        "name": "Bill Gates",
        "email": "billgates@gmail.com",
        "password": "alpine",
        "balance": 500,
        "stocks": [
            {
                "stock_id": 1,
                "price": 140,
                "count": 50
            },
            {
                "stock_id": 2,
                "price": 100,
                "count": 30
            }
        ]
    }
]

export default class Brokers extends Component {
    constructor (props) {
        super(props)

        this.state = {
            showNewBrokerModal: false,
            showBrokerDetailsModal: false,
            broker: {}
        }

        this.openNewBrokerModal = this.openNewBrokerModal.bind(this);
        this.hideNewBrokerModal = this.hideNewBrokerModal.bind(this);
        this.openBrokerDetailsModal = this.openBrokerDetailsModal.bind(this);
        this.hideBrokerDetailsModal = this.hideBrokerDetailsModal.bind(this);
    }

    openNewBrokerModal () {
        this.setState({
            showNewBrokerModal: true
        })
    }

    hideNewBrokerModal () {
        this.setState({
            showNewBrokerModal: false
        })
    }

    openBrokerDetailsModal (broker_id) {
        const broker = dumpBrokers.find(broker => broker.id === broker_id)
        this.setState({
            showBrokerDetailsModal: true,
            broker: broker
        })
    }

    hideBrokerDetailsModal () {
        this.setState({
            showBrokerDetailsModal: false
        })
    }

    render() {
        return (
            <div className="brokers-page">
                <div className="brokers-header">
                    <h4 className="brokers-headline">Список брокеров</h4>
                    <div className="brokers-controls">
                        <Button 
                            variant="success" 
                            type="submit"
                            onClick={this.openNewBrokerModal}
                        >
                            Новый брокер
                        </Button>
                    </div>
                </div>
                <div className="brokers-divider"></div>
                {dumpBrokers.map(broker => <Broker 
                    broker={broker} 
                    key={broker.id}
                    open={this.openBrokerDetailsModal}
                />)}
                <NewBroker 
                    show={this.state.showNewBrokerModal} 
                    hide={this.hideNewBrokerModal}
                />
                <BrokerDetails 
                    show={this.state.showBrokerDetailsModal}
                    hide={this.hideBrokerDetailsModal}
                    broker={this.state.broker}
                />
            </div>
        )
    }
}