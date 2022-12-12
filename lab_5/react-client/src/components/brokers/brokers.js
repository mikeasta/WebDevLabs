import { Component } from "react"
import { Button } from "react-bootstrap"
import "./brokers.css"

import Broker from "../broker";

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
    render() {
        return (
            <div className="brokers-page">
                <div className="brokers-header">
                    <h4 className="brokers-headline">Список брокеров</h4>
                    <div className="brokers-controls">
                        <Button variant="success" type="submit">
                            Новый брокер
                        </Button>
                    </div>
                </div>
                <div className="brokers-divider"></div>
                {dumpBrokers.map(broker => <Broker broker={broker}/>)}
            </div>
        )
    }
}