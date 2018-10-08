import React, { Component } from "react";
import Icon from "./Icon.js";
import { ICONS } from "../constants.js";
import classnames from "classnames";
import "../App.css";
import "./Game.css";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: "",
            started: false,
            testIndex: 0,
            noOfMistakes: 0,
            showAnswer: false,
            showWrong: false,
            question: "",
            noOfWrongs: 0,
            noOfRights: 0
        };
    }

    componentWillMount = () => {
        this.timeOuts = [];
    };

    componentWillUnmount = () => {
        this.timeOuts.forEach(clearTimeout);
    };

    toggleGame = () => {
        let value = this.state.started;
        let tstIndex = Math.floor(Math.random() * this.props.tests.length);
        this.setState({
            started: !value,
            testIndex: tstIndex,
            question: this.randomArrayItem(
                this.props.tests[tstIndex].questions
            ),
            noOfWrongs: 0,
            noOfRights: 0,
            showAnswer: false,
            showWrong: false,
            answer: ""
        });
    };

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.tests.length === 0 && this.props.tests.lenth > 0) {
        //     this.toggleGame();
        // }
        if (
            this.props.tests &&
            prevProps.tests !== this.props.tests &&
            this.props.tests.length > 0
        ) {
            this.restartGame(true);
        }
    }

    restartGame = changeIndex => {
        let tstIndex = changeIndex
            ? Math.floor(Math.random() * this.props.tests.length)
            : this.state.testIndex;
        this.setState({
            started: true,
            testIndex: tstIndex,
            question: this.randomArrayItem(this.props.tests[tstIndex].questions)
        });
    };

    randomizeHint = () => {
        let hints = this.props.tests[this.state.testIndex].answers;
        return this.randomArrayItem(hints);
    };

    randomArrayIndex = arr => {
        let randomIndex = 0;
        if (arr.length > 1) {
            randomIndex = Math.floor(Math.random() * arr.length);
        }
        return randomIndex;
    };
    randomArrayItem = arr => {
        return arr[this.randomArrayIndex(arr)];
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    checkAnswer = () => {
        let test = this.props.tests[this.state.testIndex];
        this.setState({ showWrong: false });
        if (test.answers.includes(this.state.answer)) {
            let currentIndex = this.state.testIndex;
            let nextIndex =
                currentIndex >= this.props.tests.length - 1
                    ? 0
                    : currentIndex + 1;
            this.setState({
                answer: "",
                noOfMistakes: 0,
                showAnswer: false,
                testIndex: nextIndex,
                question: this.randomArrayItem(
                    this.props.tests[nextIndex].questions
                ),
                noOfRights:
                    this.state.noOfRights + (this.state.showAnswer ? 0 : 1)
            });
        } else {
            let mistakes = this.state.noOfMistakes;
            this.setState({ noOfMistakes: ++mistakes });
            if (this.state.noOfMistakes > 2) {
                this.setState({
                    noOfMistakes: 0,
                    showAnswer: true,
                    answer: this.randomizeHint(),
                    showWrong: false,
                    noOfWrongs: this.state.noOfWrongs + 1
                });
            } else {
                this.timeOuts.push(
                    setTimeout(() => {
                        this.setState({ showWrong: true });
                    }, 200)
                );
            }
        }
        this.answerInput.focus();
    };

    handleOnKeyPress = e => {
        if (e.key === "Enter") {
            this.checkAnswer();
        }
    };

    render() {
        return (
            <div>
                <div className="game">
                    <div className="question">{this.state.question}</div>
                    <div className="answer">
                        <input
                            placeholder=":answer"
                            onChange={this.onChange}
                            onKeyPress={this.handleOnKeyPress}
                            value={this.state.answer}
                            className={classnames(
                                { hint: !!this.state.showAnswer },
                                { error: this.state.showWrong }
                            )}
                            ref={ip => (this.answerInput = ip)}
                            type="text"
                            id="answer"
                            name="answer"
                        />
                    </div>
                </div>
                <div className="footer">
                    <div className="stats">
                        <div>
                            <div>{this.state.noOfWrongs}</div>
                            <div>{this.state.noOfRights}</div>
                        </div>
                    </div>
                    <div className="buttons">
                        <div onClick={this.toggleGame}>Reset</div>
                        <div onClick={this.checkAnswer}>Verify</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
