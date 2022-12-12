import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import "./exchange.css"

export default class Exchange extends Component {
    render() {
        return (
            <div className="exchange-page">
                <div className="exchange-header">
                    <h4 className="exchange-headline">Настройки биржи</h4>
                    <Form className="exchange-controls">
                        <Button variant="success" type="submit">
                            Запустить торги
                        </Button>
                        <Button variant="primary" type="submit">
                            Открыть окно торгов
                        </Button>
                    </Form>
                </div>
                <div className="exchange-divider"/>
                <Form className="exchange-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Статус биржи</Form.Label>
                        <Form.Control type="text" placeholder="Статус биржи" disabled/>
                        <Form.Text className="text-muted">
                            Чтобы запустить продажи, нажмите на кнопку "Запустить торги"
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
            </div>
        )
    }
}