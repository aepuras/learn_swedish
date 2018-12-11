import React, { Component } from "react";
import Setting from "./Setting";
import { ThemeContext } from '../theme-context';
import "./Settings.css";
import iScroll from "iscroll/build/iscroll-probe";
import ReactIScroll from "react-iscroll";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.theScroll = React.createRef();
    }

    onScrollStart() {
        console.log("testing");
    }

    settingsComponents() {
        return this.props.settings.map((setting, i) => {
            return (
                <Setting
                    key={i}
                    setting={setting}
                    selected={this.props.selected === setting}
                    choose={() => this.props.choose(setting)}
                    disabled={this.props.disabled.includes(setting)}
                />
            );
        });
    }

    componentDidMount() {
        this.theScroll.current.withIScroll(
            true,
            function (iScroll) {
                iScroll.scrollTo(
                    this.props.title === "Question" ? -100 : -225,
                    0
                );
            }.bind(this)
        );
    }

    getGradientStyle = (theme, direction) => {
        return ({
            backgroundColor: theme.panelBackground,
            background: `linear-gradient(to ${direction}, ${theme.panelBackground}00, ${theme.panelBackground})`
        });
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                <div className="settings" style={{ backgroundColor: theme.secondColor }}>
                        <div className="title" style={{ color: theme.textColorInverted }}>{this.props.title}</div>
                        <div className="item" style={{ backgroundColor: theme.panelBackground }}>
                            <div className="gradient_start" style={this.getGradientStyle(theme, 'left')} />
                            <ReactIScroll
                                ref={this.theScroll}
                                iScroll={iScroll}
                                options={this.props.options}
                                className="scroller-wrapper"
                            >
                                <div className="scroller">
                                    <ul id="questions-list">
                                        {this.settingsComponents()}
                                    </ul>
                                </div>
                            </ReactIScroll>
                            <div className="gradient_end">
                                <div  style={this.getGradientStyle(theme, 'right')} />
                            </div>
                        </div>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

Settings.defaultProps = {
    options: {
        scrollX: true,
        scrollY: false,
        bounce: true,
        snap: false,
        eventPassthrough: true
    }
};

export default Settings;
