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
                    tests: this.shuffleArray(
                        response.data.words.map(item => {
                            return {
                                questions: item.swedish,
                                answers: item.english
                            };
                        })
                    )
                });
            }.bind(this)
        );
    }

    shuffleArray = arr => {
        let a = arr.slice(0);
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

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
