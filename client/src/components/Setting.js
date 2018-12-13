import React, { Component } from 'react';
import { ThemeContext } from '../theme-context';
import '../App.css';
import './Setting.css';

class Setting extends Component {
    constructor(props) {
        super(props);

        this.choose = this.choose.bind(this);
    }
	
    choose() {
        !this.props.disabled && this.props.choose();
    }

    getStyle(theme) {
        let style = null;
        !!this.props.selected && (style = {
            backgroundColor: theme.secondColor,
            color: theme.textColorInverted
        });
        !!this.props.disabled && (style = {
            backgroundColor: `${theme.secondColor}66`,
            color: `${theme.textColor}66`
        });
        return style;
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <li style={this.getStyle(theme)} onClick={this.choose}>
                        {this.props.setting}
                    </li>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Setting;
