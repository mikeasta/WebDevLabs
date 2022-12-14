import React from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { connect } from 'react-redux';

class BrokerInfo extends React.Component
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
						Брокер
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={event => {
						this.props.onSubmit(event, this.props.active);
						this.props.hide();
					}} className="mb-3">
						<Form.Group 
							className="mb-1"
							controlId="name-control"
						>
							<Form.Label>Имя</Form.Label>
							<Form.Control 
								type="text"
								name="name"
								defaultValue={this.props.current.name}
							/>
						</Form.Group>
						<Form.Group 
							className="mb-1"
							controlId="email-control"
						>
							<Form.Label>Email</Form.Label>
							<Form.Control 
								type="email"
								name="email"
								defaultValue={this.props.current.email}
							/>
						</Form.Group>
						<Form.Group 
							className="mb-1"
							controlId="password-control"
						>
							<Form.Label>Пароль</Form.Label>
							<Form.Control 
								type="password"
								name="password"
								defaultValue={this.props.current.password}
							/>
						</Form.Group>
						<Form.Group 
							className="mb-1"
							controlId="balance-control"
						>
							<Form.Label>Баланс</Form.Label>
							<InputGroup>
								<InputGroup.Text>$</InputGroup.Text>
								<Form.Control 
									type="text"
									name="balance"
									defaultValue={this.props.current.balance}
								/>
							</InputGroup>	
						</Form.Group>
						<Form.Group 
							className="mt-3"
							controlId="buttons-control"
						>
							<Button variant="success" type="submit">Сохранить</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
};

const mapStateToProps = (state, ownProps) => { 
	return {
		...ownProps,
		current: (state.brokers.find(
			broker => +broker.id === +ownProps.active
		) || {}),
	};
};
const mapDispatchToProps = (dispatch, ownProps) => ({  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrokerInfo);
