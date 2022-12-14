import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setStartDate, setUpdateRate, setOptions } from "../../actions";
import clientSocket from "../../settings/socket";
import ExchangeStatus from "./ExchangeStatus";

/* TODO: stock names */

class Settings extends React.Component
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

		this.state = { 
			showModal: false,
			date: "",
			quotes: []
		};

		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount()
	{
		clientSocket.on("exchangeUpdate", data => {
			this.setState({
				date: data.date,
				quotes: data.quotes
			});
		});
	}

	toggleModal()
	{
		this.setState({showModal: !this.state.showModal});
	}

	render()
	{
		return (
			<div>
				<div className="block-header">
					<h4>
						Настройки биржи
					</h4>
					<Form>
						<Form.Group 
							className="mb-2 block-controls"
							controlId="name-control"
						>
							{this.props.settings.emulation ? 
								<div className="d-flex justify-content-between">
									<Button
										onClick={this.props.stopExchange}
										variant="danger"
									>Остановить продажи</Button>
									<Button
										variant="primary"
										onClick={this.toggleModal}
									>Открыть окно торгов</Button>
								</div> :
								<Button 
									onClick={event => this.props.startExchange(
										event, this.props.settings
									)} 
									variant="success"
								>Начать продажи</Button>
							}
						</Form.Group>
					</Form>
				</div>
				<Form className="mb-3">
					<Form.Group 
						className="mb-2"
						controlId="status-control"
					>
						<Form.Label>Статус биржи</Form.Label>
						<Form.Control 
							type="text"
							readOnly
							value={
								this.props.settings.emulation ? 
								"Работает": "Ожидает"
							}
							className="text-muted"
						/>
					</Form.Group>
					<Form.Group 
						className="mb-2"
						controlId="start-date-control"
					>
						<Form.Label>Дата начала торгов</Form.Label>
						<Form.Control 
							type="text"
							value={this.props.settings.startDate}
							onChange={this.props.dateChange}
							readOnly={this.props.settings.emulation}
						/>
					</Form.Group>
					<Form.Group 
						className="mb-2"
						controlId="start-date-control"
					>
						<Form.Label>Частота обновления</Form.Label>
						<InputGroup>
							<Form.Control 
								type="text"
								value={this.props.settings.updateRate}
								onChange={this.props.rateChange}
								readOnly={this.props.settings.emulation}
							/>
							<InputGroup.Text>(в секундах)</InputGroup.Text>
						</InputGroup>
					</Form.Group>
				</Form>
				<ExchangeStatus 
					show={this.state.showModal}
					hide={this.toggleModal}
					date={this.state.date}
					quotes={this.state.quotes}
					stocks={this.props.settings.stocksInfo}
					emulation={this.props.settings.emulation}
				/>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => ({ 
	...ownProps,
	settings: state.settings
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	startExchange: (event, settings) => {
		event.preventDefault();
		clientSocket.emit("startExchange", settings);
	},
	stopExchange: event => {
		event.preventDefault();
		clientSocket.emit("stopExchange");
	},
	dateChange: event => {
		dispatch(setStartDate(event.target.value));
	},
	rateChange: event => {
		dispatch(setUpdateRate(event.target.value));
	},
	optionsChanged: settings => {
		dispatch(setOptions(settings));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
