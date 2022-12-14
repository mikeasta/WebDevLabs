import React from "react";
import { ListGroup, CloseButton } from "react-bootstrap";

class Broker extends React.Component
{
	render()
	{
		return (
			<ListGroup.Item
				as="li"
				className="d-flex justify-content-between align-items-start"
				action
			>
				<div onClick={this.props.onClick} className="ms-2 me-auto w-100">
					<div className="fw-bold">
						{ this.props.name }
					</div>
					<span className="fw-light">Баланс:</span> ${ +this.props.balance }
				</div>
				<CloseButton 
					onClick={this.props.onRemove}
				/>
			</ListGroup.Item>
		);
	}
};

export default Broker;
