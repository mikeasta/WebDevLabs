import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Components
import Header from "../header";
import Exchange from "../exchange";
import Stocks from "../stocks";
import "./app.css"

export default class App extends Component {
  	render() {
		return (
			<BrowserRouter>
				<Header />
				<main className="content-container">
					<Routes>
						<Route exact path="/" element={
							<Navigate replace to="/exchange" />
						}/>
						<Route path="/exchange" element={ <Exchange/>} />
						<Route path="/stocks" element={ <Stocks/>} />
					</Routes>
				</main>
			</BrowserRouter>
		);
	}
}