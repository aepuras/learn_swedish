import React, { Component } from 'react';
import classnames from 'classnames';
import './Toggle.css';

class Toggle extends Component {
	constructor (props) {
        super (props);
        this.state = {
            on: this.props.isOn || true
        }
        this.renderItem = this.renderItem.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle () {
    	const current = this.state.on;
    	this.setState({
    		on: !current
    	})
    	this.props.callback && this.props.callback(!current);
    }

    renderItem (item, i) {
    	return (
			<div
                key={i}
                className={classnames({active: ((i === 0 && this.state.on) || i === 1 && !this.state.on)})}
                onClick={this.toggle}
            >
                {item}
            </div>
    	);
    }

    render () {
    	return (
    		<div className="toggle">
    			{this.props.items.map(this.renderItem)}
    		</div>
    	);
    }
}

export default Toggle;