import React from "react";
import axios from "axios-es6";
import data from "../data/verbs";
import Settings from "../components/Settings";
import Game from "../components/Game";
import Toggle from "../components/Toggle";
import Splash from "../components/Splash";

const CURRENT_QUESTION = "presens",
    CURRENT_ANSWER = "preteritum";

class Verbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: CURRENT_QUESTION,
            currentAnswer: CURRENT_ANSWER,
            tests: [],
            commonVerbs: true,
            loading: false,
        };
        this.settings = Object.getOwnPropertyNames(data[0].items[0]);
    }

    componentDidMount() {
        this.setTests(CURRENT_QUESTION, CURRENT_ANSWER, true);
    }

    chooseQuestion = question => {
        this.setState({
            currentQuestion: question
        });
        this.setTests(
            question,
            this.state.currentAnswer,
            this.state.commonVerbs
        );
    };

    chooseAnswer = answer => {
        this.setState({
            currentAnswer: answer
        });
        this.setTests(
            this.state.currentQuestion,
            answer,
            this.state.commonVerbs
        );
    };

    toggleVerbsSet = () => {
        const commonVerbs = !this.state.commonVerbs;
        this.setState({
            commonVerbs: commonVerbs
        });
        this.setTests(
            this.state.currentQuestion,
            this.state.currentAnswer,
            commonVerbs
        );
    };

    setTests = (question, answer, commonVerbs) => {
        this.setState({ loading: true });
        axios
            .get(`/openapi/verbs/${commonVerbs ? "common" : "irregular"}`, {})
            .then(
                function(response) {
                    this.setState({
                        tests: response.data.map(item => {
                            return {
                                questions: item[question],
                                answers: item[answer]
                            };
                        }),
                        loading: false,
                    });
                }.bind(this)
            );
    };

    render() {
        return (
            <div>
                {this.state.loading && <Splash />}
                <Toggle
                    items={data.map(item => item.name)}
                    callback={this.toggleVerbsSet}
                    isOn={this.state.commonVerbs}
                />
                <Settings
                    title="Question"
                    settings={this.settings}
                    selected={this.state.currentQuestion}
                    choose={this.chooseQuestion}
                    disabled={[this.state.currentAnswer]}
                />
                <Settings
                    title="Answer"
                    settings={this.settings}
                    selected={this.state.currentAnswer}
                    choose={this.chooseAnswer}
                    disabled={[this.state.currentQuestion]}
                />
                <Game tests={this.state.tests} />
            </div>
        );
    }
}

export default Verbs;
