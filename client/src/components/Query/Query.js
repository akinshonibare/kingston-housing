//Imports
import React, { Component } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import "./Query.scss";

//bedrooms options
const bedOptions = [
	{ value: "--", label: "--" },
	{ value: "1", label: "1" },
	{ value: "2", label: "2" },
	{ value: "3", label: "3" },
	{ value: "4", label: "4" },
	{ value: "5", label: "5" },
	{ value: "6", label: "6" },
	{ value: "7", label: "7" },
	{ value: "8", label: "8" }
];

class Query extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bedNum: null
		};
	}

	render() {
		return (
			<div className="query">
				<div className="queries" />
				<div className="queries">
					filter by bedrooms
					<Select
						value={this.props.bedChoice}
						onChange={this.props.handleChange}
						options={bedOptions}
					/>
				</div>
				<div className="queries">
					filter by house type
					<Form className="checkboxes">
						<Form.Group controlId="apartment">
							<Form.Check
								type="checkbox"
								label="apartment"
								name="typeApartment"
								checked={this.props.typeApartment}
								onChange={this.props.filterHomeType}
							/>
						</Form.Group>
						<Form.Group controlId="house">
							<Form.Check
								type="checkbox"
								label="house"
								name="typeHouse"
								checked={this.props.typeHouse}
								onChange={this.props.filterHomeType}
							/>
						</Form.Group>
					</Form>
				</div>
			</div>
		);
	}
}

export default Query;
