import React from "react";
import axios from "axios-es6";
import classnames from "classnames";
import Game from "../components/Game";
import data from "../data/words";

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        };
    }

    componentDidMount() {
        axios.get("/openapi/words", {}).then(
            function(response) {
                this.setState({
                    tests: response.data.words.map(item => {
                        return {
                            questions: item.swedish,
                            answers: item.english
                        };
                    })
                });
            }.bind(this)
        );
    }

    render() {
        return <Game tests={this.state.tests} />;
    }
}

export default Words;
