import React, { Component } from "react";
import { ThemeContext } from "../theme-context";
import "./Stats.css";

class Stats extends Component {
    renderStat(stat, i, theme) {
        return (
            <div
                key={i}
                style={{
                    color: theme.textColor,
                }}
                className="statItem"
            >
                <div
                    className="statDate"
                    style={{ backgroundColor: theme.secondColor }}
                >
                    {new Date(stat.dateTaken).toLocaleString("en-US")}
                </div>
                <div>Game type: {stat.game}</div>
                <div className="statResults">
                    <div>Wrong: {stat.wrongs}</div>
                    <div>Correct: {stat.rights}</div>
                </div>
                {stat.mistakes && <div>Mistakes: {stat.mistakes}</div>}
            </div>
        );
    }

    compareStatsByDate(a, b) {
        if (new Date(a.dateTaken) > new Date(b.dateTaken)) {
            return -1;
        }
        if (new Date(a.dateTaken) < new Date(b.dateTaken)) {
            return 1;
        }
        return 0;
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div
                        className="settings"
                        style={{
                            backgroundColor: theme.secondColor,
                            borderRadius: theme.rounded,
                        }}
                    >
                        <div
                            className="title"
                            style={{ color: theme.textColorInverted }}
                        >
                            {"Stats"}
                        </div>
                        <div
                            className="statsContainer"
                            style={{
                                backgroundColor: theme.panelBackground,
                            }}
                        >
                            {this.props.stats
                                .sort(this.compareStatsByDate)
                                .map((stat, i) =>
                                    this.renderStat(stat, i, theme)
                                )}
                        </div>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Stats;
