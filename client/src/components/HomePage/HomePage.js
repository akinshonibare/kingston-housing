//Imports
import React, { Component } from "react";
import Results from "../Results/Results";
import "./HomePage.scss";
import Query from "../Query/Query";
import Loader from "react-loaders";

import { getAllHouses } from "../../actions/data";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			houses_db: null,
			houses: null,
			bedChoice: { value: "--", label: "--" },
			house: {
				lat: null,
				lng: null
			},
			typeApartment: false,
			typeHouse: false
		};
	}

	componentDidMount = () => {
		//get all housing postings from database
		getAllHouses().then(res => {
			this.setState({
				houses: res.data,
				houses_db: res.data
			});
		});
	};

	//update result on type of house filter application
	updateResults = () => {
		let temp_results = [];
		let results = [];

		if (
			this.state.typeApartment === true ||
			this.state.typeApartment === true
		) {
			for (let i = 0; i < this.state.houses_db.length; i++) {
				if (
					this.state.typeApartment === true &&
					this.state.houses_db[i]["type"] === "apartment"
				) {
					temp_results.push(this.state.houses_db[i]);
				}
				if (
					this.state.typeHouse === true &&
					this.state.houses_db[i]["type"] === "house"
				) {
					temp_results.push(this.state.houses_db[i]);
				}
			}
		} else {
			temp_results = this.state.houses_db;
		}
		if (this.state.bedChoice["value"] !== "--") {
			for (let j = 0; j < temp_results.length; j++) {
				if (
					this.state.bedChoice["value"] ===
					temp_results[j]["beds"]
				)
					results.push(temp_results[j]);
			}
		} else {
			for (let j = 0; j < temp_results.length; j++) {
				results.push(temp_results[j]);
			}
		}
		this.setState({
			houses: results
		});
	};

	//handle number of bedroom filter
	handleChange = bedChoice => {
		this.setState({ bedChoice }, () => this.updateResults());
	};

	//home type filter
	filterHomeType = event => {
		const target = event.target;
		const value = target.checked;
		const name = target.name;

		this.setState(
			{
				[name]: value
			},
			() => this.updateResults()
		);
	};

	render() {
		if (this.state.houses) {
			return (
				<div className="homepage-wrapper">
					<div className="homepage">
						<Query
							handleChange={this.handleChange}
							bedChoice={this.state.bedChoice}
							typeApartment={this.state.typeApartment}
							typeHouse={this.state.typeHouse}
							filterHomeType={this.filterHomeType}
						/>
						<Results
							houses={this.state.houses}
							map={this.state.map}
							toggleMap={this.toggleMap}
							setHouseMarker={this.setHouseMarker}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="loader-wrapper">
					<Loader type="pacman" />
				</div>
			);
		}
	}
}

export default HomePage;
