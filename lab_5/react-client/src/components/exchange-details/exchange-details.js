import { Component } from "react"
import { Modal, Table, Button } from "react-bootstrap"
import "./exchange-details.css"

export default class ExchangeDetails extends Component {
    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.props.hide}
                dialogClassName="modal-xxl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Информация об акциях на бирже</Modal.Title>
                </Modal.Header>
                <Modal.Body className="exchange-details-modal-body">
                    <p>Стоимость отслеживаемых акций на момент: {this.props.stocks["Date"]} </p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Акция</th>
                                <th>Цена (в $)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.stocks["Quotes"].map(
                                    (quote, index) => {
                                        return (
                                            <tr>
                                                <td>{index}</td>
                                                <td>{quote["Label"]}</td>
                                                <td>{quote["Open"]}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="danger"
                        onClick={this.props.hide} 
                    > 
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}