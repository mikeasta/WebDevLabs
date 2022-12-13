import { Component } from "react"
import { Modal, Button, Form, FloatingLabel, Tabs, Tab } from "react-bootstrap"
import "./stock-details.css"

export default class StockDetails extends Component {
    constructor (props) {
        super(props)

        this.state = {
            key: "list"
        }
    }

    setKey (key) {
        this.setState({key})
    }

    render () {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.props.hide}
                dialogClassName="modal-xxl"
                size="lg"
            >
                <Modal.Header closeButton>
                  <Modal.Title>Данные об акции</Modal.Title>
                </Modal.Header>
                <Modal.Body className="broker-details-modal-body">
                    <p>История изменения котировок и данные об акции:</p>
                    <FloatingLabel controlId="floatingLabel" label="Аббревиатура">
                        <Form.Control 
                            type="text" 
                            placeholder="Аббревиатура" 
                            defaultValue={this.props.stock.label}
                            disabled
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingName" label="Название">
                        <Form.Control 
                            type="text" 
                            placeholder="Название" 
                            defaultValue={this.props.stock.name}
                            disabled
                        />
                    </FloatingLabel>

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.key}
                        onSelect={k => this.setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="list" title="Список">
                            <p>Список</p>
                        </Tab>
                        <Tab eventKey="graph" title="График">
                            <p>График</p>
                        </Tab>
                    </Tabs>


                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="danger" 
                        onClick={this.props.hide}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}