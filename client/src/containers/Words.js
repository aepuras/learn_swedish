import React from "react";
import axios from "axios-es6";
import Game from "../components/Game";
import AddWord from "../components/AddWord";

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

    addWord = word => {
        axios.post("/openapi/words", word);
    };

    render() {
        return (
            <div>
                <Game tests={this.state.tests} />
                <AddWord callback={this.addWord} />
            </div>
        );
    }
}

export default Words;
