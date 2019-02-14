//Imports
import React, { Component } from "react";
import Header from "./components/Header/Header";
import { withRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import MapPage from "./components/Map/MapPage";

import "./App.scss";

class App extends Component {
	render() {
		return (
			<div className="app-wrapper">
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/map" component={MapPage} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
