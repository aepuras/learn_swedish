import React from "react";
import classnames from "classnames";
import data from "../data/verbs";
import Settings from "../components/Settings";
import Game from "../components/Game";
import Toggle from "../components/Toggle";

const CURRENT_QUESTION = "presens",
    CURRENT_ANSWER = "preteritum";

class Verbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: CURRENT_QUESTION,
            currentAnswer: CURRENT_ANSWER,
            tests: data[0].items.map(item => {
                return {
                    questions: item[CURRENT_QUESTION],
                    answers: item[CURRENT_ANSWER]
                };
            }),
            commonVerbs: true
        };
        this.settings = Object.getOwnPropertyNames(data[0].items[0]);
    }

    chooseQuestion = question => {
        this.setState({
            currentQuestion: question,
            tests: this.getTests(
                question,
                this.state.currentAnswer,
                this.state.commonVerbs
            )
        });
    };

    chooseAnswer = answer => {
        this.setState({
            currentAnswer: answer,
            tests: this.getTests(
                this.state.currentQuestion,
                answer,
                this.state.commonVerbs
            )
        });
    };

    toggleVerbsSet = () => {
        const commonVerbs = !this.state.commonVerbs;
        this.setState({
            commonVerbs: commonVerbs,
            tests: this.getTests(
                this.state.currentQuestion,
                this.state.currentAnswer,
                commonVerbs
            )
        });
    };

    getTests = (question, answer, commonVerbs) => {
        const verbSetIndex = commonVerbs ? 0 : 1;
        return data[verbSetIndex].items.map(item => {
            return {
                questions: item[question],
                answers: item[answer]
            };
        });
    };

    render() {
        return (
            <div>
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
