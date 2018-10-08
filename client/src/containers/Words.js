import React from "react";
import classnames from "classnames";
import Game from "../components/Game";
import data from "../data/words";

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: data.map(item => {
                return {
                    questions: item["swedish"],
                    answers: item["english"]
                };
            })
        };
    }

    render() {
        return <Game tests={this.state.tests} />;
    }
}

export default Words;
