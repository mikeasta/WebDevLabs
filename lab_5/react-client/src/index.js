// Libs
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// Components
import App from './components/app';

// Store
import store from "./store.js";

// Render
const root = createRoot(document.getElementById("root"))
root.render(
  	<Provider store={store}>
    	<App/> 
	</Provider>
);