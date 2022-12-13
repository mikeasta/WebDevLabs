import { Component } from "react"
import { Table } from "react-bootstrap"
import "./quote-list.css"

export default class QuoteList extends Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Дата</th>
                      <th>Цена (в $)</th>
                    </tr>
                </thead>
                <tbody id="quote-table-body">
                    {
                        this.props.quotes.map(
                            (quote, index) => { 
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{quote["Date"]}</td>
                                        <td>{quote["Open"]}</td>
                                    </tr>
                            )}
                        )
                    }
                    
                </tbody>
            </Table>
        )
    }
}