import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
	render() {
		return (
			<div className="header">
				<h3>
					<img
						src="https://www.queensu.ca/sites/default/files/assets/pages/QueensLogo_black.png"
						width="100px"
						alt="queens logo"
					/>
					HOUSING SEARCH
				</h3>
			</div>
		);
	}
}

export default Header;
