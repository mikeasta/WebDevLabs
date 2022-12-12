import { Component } from "react"
import { Card, Button } from "react-bootstrap"
import './stock.css'

export default class Stock extends Component {
    render() {
        return (
            <Card className="stock-card">
                <Card.Body className="stock-body">
                    <div className="stock-text">
                        <p className="stock-label">{this.props.stock.label}</p>
                        <p className="stock-name">{this.props.stock.name}</p>
                    </div>
                    <Button variant="success" type="submit">
                        Включить в торговлю
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}