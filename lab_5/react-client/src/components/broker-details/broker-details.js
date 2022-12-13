import { Component } from "react"
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap"
import "./broker-details.css"

export default class BrokerDetails extends Component {
    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.props.hide}
                dialogClassName="modal-xxl"
            >
                <Modal.Header closeButton>
                  <Modal.Title>Данные брокера</Modal.Title>
                </Modal.Header>
                <Modal.Body className="broker-details-modal-body">
                    <p>Просмотр и изменение данных о брокере:</p>
                    <FloatingLabel controlId="floatingName" label="Имя">
                        <Form.Control 
                            type="text" 
                            placeholder="Имя брокера" 
                            defaultValue={this.props.broker.name}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Электронная почта"
                      className="mb-3"
                    >
                        <Form.Control 
                            type="email" 
                            placeholder="name@example.com"
                            defaultValue={this.props.broker.email} 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Пароль">
                        <Form.Control 
                            type="password" 
                            placeholder="Пароль" 
                            defaultValue={this.props.broker.password}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingBalance" label="Баланс">
                        <Form.Control 
                            type="text" 
                            placeholder="Счет в $" 
                            defaultValue={this.props.broker.balance}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" >
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}