import React from "react";
import Broker from "./Broker";
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BrokerInfo from "./BrokerInfo";
import clientSocket from "../../settings/socket";
import { 
	setBrokers 
} from "../../actions";

class BrokerList extends React.Component
{
	constructor(props)
	{
		super(props);

		if (!this.props.brokers.length)
			clientSocket.emit("brokers");
		clientSocket.on("brokers", brokers => this.props.dataChanged(brokers));

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
						Список брокеров
					</h4>
					<Button 
						onClick={() => this.openModal()} 
						variant="success" 
						className="mb-1"
					>Новый брокер</Button>
				</div>
				<ListGroup as="ol" numbered>
					{
						this.props.brokers.map(broker => 
							<Broker 
								key={broker.id}
								{...broker}
								onClick={() => this.openModal(broker.id)}
								onRemove={(event) => this.props.onRemove(
									event, broker.id
								)}
							/>
						)
					}
				</ListGroup>
				<BrokerInfo 
					active={this.state.active}
					show={this.state.showModal}
					hide={this.hideModal}
					onSubmit={this.props.onSubmit}
				/>
			</div>	
		);
	}
};

const mapStateToProps = (state, ownProps) => ({ 
	...ownProps,
	brokers: state.brokers
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	dataChanged: data => dispatch(setBrokers(data)),
	onSubmit: (event, id) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = {};
		for (let entry of formData.entries())
			data[entry[0]] = entry[1];
		data.id = id;
		clientSocket.emit("updateBroker", data);
	},
	onRemove: (event, id) => {
		event.preventDefault();
		if (window.confirm("Вы уверены, что хотите удалить этого брокера?"))
			clientSocket.emit("removeBroker", id);
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrokerList);
