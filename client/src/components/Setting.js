import React, { Component } from "react";
import classnames from "classnames";
import "../App.css";
import "./Setting.css";

class Setting extends Component {
	render() {
		return (
			<li
				className={classnames(
					{ selected: !!this.props.selected },
					{ disabled: !!this.props.disabled }
				)}
				onClick={() => {
					!this.props.disabled ? this.props.choose() : false;
				}}
			>
				{this.props.setting}
			</li>
		);
	}
}

export default Setting;
