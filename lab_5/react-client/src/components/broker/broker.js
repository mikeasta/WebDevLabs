import { Component } from "react"
import { Card, Button } from "react-bootstrap"
import "./broker.css"

export default class Broker extends Component {
    constructor (props) {
        super(props)
        this.broker = props.broker;
    }

    render() {
        return (
            <Card className="broker-card">
                <Card.Body className="broker-body">
                    <div className="broker-text">
                        <div className="broker-contact">
                            <p className="broker-name">{this.broker.name}</p>
                            <p className="broker-email">{this.broker.email}</p>
                        </div>
                        
                    </div>
                    <div className="broker-info">
                        <p className="broker-balance">
                            Баланс: <b>${this.broker.balance}</b>
                        </p>
                        <div className="broker-controls">
                            <Button variant="primary" type="submit">
                                Изменить 
                            </Button>
                            <Button variant="danger" type="submit">
                               Удалить
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}