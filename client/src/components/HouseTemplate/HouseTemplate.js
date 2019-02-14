//Imports
import React, { Component } from "react";
import "./HouseTemplate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBed, faShower, faMap } from "@fortawesome/free-solid-svg-icons";

class HouseTemplate extends Component {
	render() {
		let {
			address,
			img,
			url,
			beds,
			bath,
			price,
			agency,
			_id
		} = this.props.house;
		if (agency === "mackinnon development")
			address = `${address} - $${price}/BDRM `;

		return (
			<li className={this.props.single ? "card-item" : "cards-item"}>
				<div className="card">
					<div
						className="card-image"
						style={{ backgroundImage: `url(${img})` }}
					/>
					<div className="card-content">
						<div className="card-title">{address}</div>
						<div className="card-text icons">
							<p>
								<span>{beds}</span>
								<FontAwesomeIcon
									icon={faBed}
									color="#003366"
									size="2x"
								/>
							</p>
							<p>
								<span>{bath}</span>
								<FontAwesomeIcon
									icon={faShower}
									color="#003366"
									size="2x"
								/>
							</p>
							<Link
								to={`/map?id=${_id}`}
								style={{ textAlign: "right" }}
							>
								<FontAwesomeIcon icon={faMap} color="#003366" />
								view on map
							</Link>
						</div>

						<a href={url}>
							<button className="btn btn--block card__btn">
								Check it out
							</button>
						</a>
					</div>
				</div>
			</li>
		);
	}
}

export default HouseTemplate;
