import React, { Component } from 'react';
import classnames from 'classnames';
import { ThemeContext } from '../theme-context';
import './Toggle.css';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: this.props.isOn || true
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOn !== this.props.isOn) {
            this.setState({ on: this.props.isOn });
        }
    }

    toggle() {
        const current = this.state.on;
        this.setState({
            on: !current
        });
        this.props.callback && this.props.callback(!current);
    }

    getStyle(i, theme) {
        if ((i === 0 && this.state.on) || (i === 1 && !this.state.on)) {
            return ({
                backgroundColor: theme.secondColor,
                color: theme.textColorInverted
            });
        } else {
            return ({
                backgroundColor: theme.panelBackground,
                color: theme.textColor
            });
        }
    }

    renderItem (item, i, theme) {
        return (
            <div
                key={i}
                className={classnames({
                    active:
                        (i === 0 && this.state.on) ||
                        (i === 1 && !this.state.on)
                })}
                style={this.getStyle(i, theme)}
                onClick={this.toggle}
            >
                {item}
            </div>
        );
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div className="toggle" style={{ borderRadius: theme.rounded }}>
                        {this.props.items.map((item, i) => this.renderItem(item, i, theme))}
                    </div>
                )}
            </ThemeContext.Consumer>

        );
    }
}

export default Toggle;
