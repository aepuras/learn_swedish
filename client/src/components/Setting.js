import React, { Component } from "react";
import classnames from "classnames";
import "../App.css";
import "./Setting.css";

class Setting extends Component {
	choose = () => {
		!this.props.disabled && this.props.choose();
	};

	render() {
		return (
			<li
				className={classnames(
					{ selected: !!this.props.selected },
					{ disabled: !!this.props.disabled }
				)}
				onClick={this.choose}
			>
				{this.props.setting}
			</li>
		);
	}
}

export default Setting;
