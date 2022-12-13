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
                    
                    <div className="stock-controls">
                        <Button 
                            variant="primary" 
                            type="submit"
                            onClick={() => this.props.open(this.props.stock.id)}
                        >
                            Данные о котировках
                        </Button>
                        <Button variant="success" type="submit">
                            Включить в торговлю
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}