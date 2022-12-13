import { Component } from "react"
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap"
import "./new-broker.css"

export default class NewBroker extends Component {
    render() {
        console.log(this.props.show)
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.props.hide}
                dialogClassName="modal-xxl"
            >
                <Modal.Header closeButton>
                  <Modal.Title>Новый брокер</Modal.Title>
                </Modal.Header>
                <Modal.Body className="new-broker-modal-body">
                    <p>Введите данные нового брокера:</p>
                    <FloatingLabel controlId="floatingName" label="Имя">
                        <Form.Control type="text" placeholder="Имя" />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Электронная почта"
                      className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Пароль">
                        <Form.Control type="password" placeholder="Пароль" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingBalance" label="Баланс (в $)">
                        <Form.Control type="text" placeholder="Счет в $" />
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