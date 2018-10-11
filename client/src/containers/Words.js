import React from "react";
import axios from "axios-es6";
import Game from "../components/Game";
import AddWord from "../components/AddWord";
import Toggle from "../components/Toggle";

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            toEnglish: true
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

    toggleToFrom = () => {
        this.setState({
            tests: this.state.tests.map(item => {
                return {
                    questions: item.answers,
                    answers: item.questions
                };
            })
        });
    };

    render() {
        return (
            <div>
                <Toggle
                    items={["to english", "to swedish"]}
                    callback={this.toggleToFrom}
                    isOn={this.state.toEnglish}
                />
                <Game tests={this.state.tests} />
                <AddWord callback={this.addWord} />
            </div>
        );
    }
}

export default Words;
