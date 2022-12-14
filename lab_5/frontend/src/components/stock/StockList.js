import React from "react";
import Stock from "./Stock";
import StockInfo from "./StockInfo";
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import clientSocket from "../../settings/socket.js";
import { 
	setStocks, 
	addStockToEmulation, 
	removeStockFromEmulation,
	setOptions
} from "../../actions";

class StockList extends React.Component
{
	constructor(props)
	{
		super(props);

		if (
			!this.props.settings?.emulatedStocks.length && 
			!this.props.settings?.updateRate
		)
			clientSocket.emit("getSettings");
		clientSocket.on("getSettings", data => this.props.optionsChanged(data));
		if (!this.props.stocks.length)
			clientSocket.emit("stocks");
		clientSocket.on("stocks", stocks => this.props.dataChanged(stocks));

		this.state = { 
			showModal: false,
			active: -1
		};
		this.openModal = this.openModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	openModal(id = -1)
	{
		this.setState({
			showModal: true,
			active: id
		});
	}

	hideModal()
	{
		this.setState({showModal: false});
	}

	render()
	{
		return (
			<div>
				<div className="block-header">
					<h4>
						Список акций
					</h4>
				</div>
				<ListGroup as="ol" numbered>
					{this.props.stocks.map(stock => 
						<Stock 
							key={stock.id}
							{...stock}
							onRemove={this.props.onRemove}
							onAdd={this.props.onAdd}
							onClick={() => this.openModal(stock.id)}
							isEmulated={!!this.props.emulated?.find(
								emulated => emulated === stock.id
							)}
						/>
					)}
				</ListGroup>
				<StockInfo 
					activeStock={this.state.active}
					show={this.state.showModal}
					hide={this.hideModal}
				/>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => ({ 
	...ownProps,
	stocks: state.stocks,
	settings: state.settings,
	emulated: state.settings.emulatedStocks
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	dataChanged: data => dispatch(setStocks(data)),
	optionsChanged: settings => dispatch(setOptions(settings)),
	onRemove: (event, id) => {
		event.preventDefault();
		dispatch(removeStockFromEmulation(id));
	},
	onAdd: (event, id) => {
		event.preventDefault();
		dispatch(addStockToEmulation(id));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StockList);
