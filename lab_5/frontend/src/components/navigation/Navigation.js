import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Navigation extends React.Component
{
	render()
	{
		return (
			<Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
				<Container>
					<Navbar.Brand as={Link} to="/stocks">Stocks.IO</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/exchange">Биржа</Nav.Link>
							<Nav.Link as={Link} to="/stocks">Акции</Nav.Link>
							<Nav.Link as={Link} to="/brokers">Брокеры</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default Navigation;
