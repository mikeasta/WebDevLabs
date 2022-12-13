import { Component } from "react";

import Stock from "../stock";
import StockDetails from "../stock-details";
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
	constructor (props) {
		super(props)

		this.state = {
			stock: {},
			quotes: [{
				"Date": "11/04/2022",
				"Open": "142.09"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			},
			{
				"Date": "10/28/2022",
				"Open": "148.2"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			},
			{
				"Date": "11/03/2022",
				"Open": "142.06"
			},
			{
				"Date": "11/02/2022",
				"Open": "148.945"
			},
			{
				"Date": "11/01/2022",
				"Open": "155.08"
			},
			{
				"Date": "10/31/2022",
				"Open": "153.155"
			}],
			showStockDetailsModal: false
		}

		this.openStockDetailsModal = this.openStockDetailsModal.bind(this);
		this.hideStockDetailsModal = this.hideStockDetailsModal.bind(this);
	}

	openStockDetailsModal (stock_id) {
		this.setState({
			showStockDetailsModal: true,
			stock: dumbStocks.find(stock => stock.id === stock_id)
		})
	}

	hideStockDetailsModal () {
		this.setState({
			showStockDetailsModal: false
		})
	}

    render() {
        return (
            <div className="stocks-page">
                <div className="stocks-header">
                    <h4 className="stocks-headline">Список акций</h4>
                </div>
                <div className="stocks-divider"/>
                { dumbStocks.map(stock => <Stock 
					stock={stock} 
					key={stock.id}
					open={this.openStockDetailsModal}
				/>) }
				<StockDetails 
					show={this.state.showStockDetailsModal}
					hide={this.hideStockDetailsModal}
					stock={this.state.stock}
					quotes={this.state.quotes}
				/>
            </div>
        )
    }
}