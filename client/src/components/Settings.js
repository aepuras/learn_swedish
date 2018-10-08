import React, { Component } from "react";
import Setting from "./Setting";
import "./Settings.css";
import iScroll from "iscroll/build/iscroll-probe";
import ReactIScroll from "react-iscroll";

class Settings extends Component {
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
        this.refs.iScroll.withIScroll(
            true,
            function(iScroll) {
                iScroll.scrollTo(
                    this.props.title === "Question" ? -100 : -225,
                    0
                );
            }.bind(this)
        );
    }

    render() {
        return (
            <div className="settings">
                <div className="title">{this.props.title}</div>
                <div className="item">
                    <div className="gradient_start" />
                    <ReactIScroll
                        ref="iScroll"
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
                        <div />
                    </div>
                </div>
            </div>
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
