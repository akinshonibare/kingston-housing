//Imports
import React, { Component } from "react";
import HouseTemplate from "../HouseTemplate/HouseTemplate";
import "./Results.scss";

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	//map list of houses to the house template
	results = () => {
		return this.props.houses.map(house => (
			<HouseTemplate house={house} key={house._id} />
		));
	};

	render() {
		if (this.props.houses.length === 0) {
			return (
				<div className="empty">
					:( No Houses Available at this Moment
				</div>
			);
		} else {
			return <ul className={"results-wrapper"}>{this.results()}</ul>;
		}
	}
}
export default Results;
