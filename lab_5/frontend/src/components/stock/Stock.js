import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Stock extends React.Component
{
	render()
	{
		return (
			<ListGroup.Item
				as={ Link }
				className="d-flex justify-content-between align-items-start"
				action
			>
				<div onClick={this.props.onClick} className="ms-2 me-auto w-100">
					<div className="fw-bold">
						{ this.props.label }
					</div>
					{ this.props.name }
				</div>
				{ this.props.isEmulated ? 
					<Button 
						variant="outline-link"
						className="fs-2 p-0 lh-sm text-danger border-0"
						onClick={e => this.props.onRemove(e, this.props.id)} 
						title="Remove stock from exchange"
					>
						&#215;
					</Button> :
					<Button 
						variant="outline-link"
						className="fs-2 p-0 lh-sm text-success border-0"
						onClick={e => this.props.onAdd(e, this.props.id)}
						title="Add stock to exchange"
					>
						&#43;
					</Button>
				}
			</ListGroup.Item>
		);
	}
};

export default Stock;
