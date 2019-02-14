import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Map from "./Map";
import HouseTemplate from "../HouseTemplate/HouseTemplate";
import { getLatLong, getHouse } from "../../actions/data";
import "./Map.scss";

const LOCATIONS = [
	{ value: { lat: 44.233335, lng: -76.492775 }, label: "THE HUB" },
	{ value: { lat: 44.227699, lng: -76.495277 }, label: "QUEENS UNIVERSITY" },
	{ value: { lat: 44.232056, lng: -76.485739 }, label: "DOWNTOWN" }
];

class MapPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			house_location: {
				lat: -44.232056,
				lng: -76.485739
			},
			house: null,
			distanceTo: {
				value: { lat: 44.227699, lng: -76.495277 },
				label: "QUEENS UNIVERSITY"
			}
		};
	}
	componentDidMount() {
		var house_id = this.props.location.search.split("=")[1];
		getHouse(house_id).then(res => {
			this.setState(
				{
					house: res.data
				},
				() => this.setHouseMarker(this.state.house["address"])
			);
		});
	}

	//set house to see on map
	setHouseMarker = address => {
		//get lat and long from address seleted
		getLatLong(address).then(res => {
			this.setState({
				house_location: res.data.results[0].geometry.location
			});
		});
	};

	handleLocationChange = distanceTo => {
		this.setState({ distanceTo }, () => console.log(this.state.distanceTo));
	};

	render() {
		return (
			<div className="map-view">
				<div style={{ textAlign: "center" }}>
					<Link to="/"> {"<---"} Back</Link>
				</div>

				<div className="content">
					{this.state.house && (
						<div style={{ paddingTop: "10%" }}>
							<HouseTemplate
								house={this.state.house}
								single={true}
							/>
						</div>
					)}
					<div style={{ padding: "1rem" }}>
						<div className="map-filter">
							<div>A: future house</div>
							<div className="select">
								B:{" "}
								<Select
									value={this.state.distanceTo}
									onChange={this.handleLocationChange}
									options={LOCATIONS}
								/>
							</div>
						</div>
						<Map
							house={this.state.house_location}
							destination={this.state.distanceTo}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default MapPage;
