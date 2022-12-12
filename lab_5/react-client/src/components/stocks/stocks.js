import { Component } from "react";
import Stock from "../stock";
import "./stocks.css";

const dumbStocks = [
    {
		"id": 1,
		"label": "AAPL",
		"name": "Apple, Inc."
	},
	{
		"id": 2,
		"label": "SBUX",
		"name": "Starbucks, Inc."
	},
	{
		"id": 3,
		"label": "MSFT",
		"name": "Microsoft, Inc."
	}
]

export default class Stocks extends Component {
    render() {
        return (
            <div className="stocks-page">
                <div className="stocks-header">
                    <h4 className="stocks-headline">Список акций</h4>
                </div>
                <div className="stocks-divider"/>
                { dumbStocks.map(stock => <Stock stock={stock} key={stock.id}/>) }
            </div>
        )
    }
}