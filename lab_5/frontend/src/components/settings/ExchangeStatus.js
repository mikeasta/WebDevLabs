import React from "react";
import { Modal } from "react-bootstrap";
import InfoTable from "../info-table/InfoTable";

class ExchangeStatus extends React.Component
{
	render()
	{
		const quotes = this.props.stocks.map(
			stock => {
				const quote = this.props.quotes.find(
					_quote => +_quote.stock_id === +stock.id
				);
				return {
					label: stock.label,
					name: stock.name,
					price: quote?.price || "-"
				};
			}
		);
		return (
			<Modal 
				dialogClassName="modal-xxl"
				show={this.props.show}
				onHide={this.props.hide}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Торговля
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					
					<div className="d-flex justify-content-between">
						{ !this.props.emulation ? <div className="text-danger">Продажи остановлены</div> : <div></div> }
						Дата: { this.props.date }
					</div>
					<InfoTable 
						headers={[
							{label: "Название", name: "name"},
							{label: "Аббревиатура", name: "label"},
							{label: "Стоимость", name: "price"}
						]}
						items={quotes}
					/>
				</Modal.Body>
			</Modal>
		);
	}
};

export default ExchangeStatus;
