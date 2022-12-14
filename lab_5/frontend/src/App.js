import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import StockList from "./components/stock/StockList";
import BrokerList from "./components/broker/BrokerList";
import Settings from "./components/settings/Settings";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component
{
	render()
	{
		return (
			<BrowserRouter>
				<Navigation />
				<div className="container my-3">
					<Routes>
						<Route exact path="/" element={<Navigate replace to="/stocks" />}></Route>
						<Route path="/stocks" element={<StockList />}></Route>
						<Route path="/brokers" element={<BrokerList />}></Route>
						<Route path="/exchange" element={<Settings />}></Route>
					</Routes>
				</div>	
			</BrowserRouter>
		);
	}
};
