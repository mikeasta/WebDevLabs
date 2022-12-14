import React from "react";
import { Modal, Form, Tab, Tabs } from "react-bootstrap";
import InfoTable from "../info-table/InfoTable";
import InfoChart from "../info-chart/InfoChart";
import { connect } from 'react-redux';

class StockInfo extends React.Component
{
	render()
	{
		return (
			<Modal 
				dialogClassName="modal-xxl"
				show={this.props.show}
				onHide={this.props.hide}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Акция
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="mb-3">
						<Form.Group 
							className="mb-1"
							controlId="label-control"
						>
							<Form.Label>Аббревиатура</Form.Label>
							<Form.Control 
								type="text"
								readOnly
								defaultValue={this.props.current.label}
							/>
						</Form.Group>
						<Form.Group 
							className="mb-1"
							controlId="name-control"
						>
							<Form.Label>Название</Form.Label>
							<Form.Control 
								type="text"
								readOnly
								defaultValue={this.props.current.name}
							/>
						</Form.Group>
					</Form>
					<Tabs defaultActiveKey="table">
						<Tab eventKey="table" title="Таблица">
							<InfoTable 
								headers={[{label: "Дата", name: "Date"}, {label: "Цена, $", name: "Open"}]}
								items={this.props.current.quotes}
							/>
						</Tab>
						<Tab eventKey="chart" title="График">
							<InfoChart 
								xFieldName="Date" 
								yFieldName="Open" 
								headers={[{label: "Дата", name: "Date"}, {label: "Цена, $", name: "Open"}]} 
								items={
									JSON.parse(JSON.stringify(this.props.current.quotes || [])).reverse()
								}
								name={this.props.current.name}
							/>
						</Tab>
					</Tabs>
				</Modal.Body>
			</Modal>
		);
	}
};

const mapStateToProps = (state, ownProps) => { 
	return {
		...ownProps,
		current: (state.stocks.find(
			stock => +stock.id === +ownProps.activeStock
		) || {})
	};
};

export default connect(
	mapStateToProps
)(StockInfo);
