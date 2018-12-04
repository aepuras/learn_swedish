import React, { Component } from "react";
import classnames from "classnames";
import Icon from "./Icon";
import { ICONS } from "../constants.js";
import { ThemeContext } from '../theme-context';
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
            noOfRights: 0,
            excludeLearned: false
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
        let tstIndex = Math.floor(Math.random() * this.filteredTests().length);
        this.setState({
            started: !value,
            testIndex: tstIndex,
            question: this.getQuestion(tstIndex),
            noOfWrongs: 0,
            noOfRights: 0,
            showAnswer: false,
            showWrong: false,
            answer: ""
        });
    };

    filteredTests = () => {
        return this.state.excludeLearned
            ? this.props.tests.filter(test => !test.learned)
            : this.props.tests;
    };

    toggleExcludeLearned = () => {
        this.setState(
            {
                excludeLearned: !this.state.excludeLearned
            },
            () => {
                this.restartGame(true);
            }
        );
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.tests &&
            prevProps.tests &&
            prevProps.tests !== this.props.tests &&
            this.props.tests.length > 0
        ) {
            const changeIndex =
                prevProps.tests.length !== this.props.tests.length;
            this.restartGame(changeIndex);
        }
    }

    restartGame = changeIndex => {
        let tstIndex = changeIndex
            ? Math.floor(Math.random() * this.filteredTests().length)
            : this.state.testIndex;
        this.setState({
            started: true,
            testIndex: tstIndex,
            question: this.getQuestion(tstIndex)
        });
    };

    randomizeHint = () => {
        let hints = this.filteredTests()[this.state.testIndex].answers;
        return this.randomArrayItem(hints);
    };

    randomNumber = (max) => {
        let rnd = 0;
        if (max > 1) {
            rnd = Math.floor(Math.random() * max);
        }
        return rnd;
    };
    randomArrayItem = arr => {
        return arr[this.randomNumber(arr.length)];
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getNextIndex = () => {
        let nextIndex =
            this.state.testIndex >= this.filteredTests().length - 1
                ? 0
                : this.state.testIndex + 1;
        return nextIndex;
    };

    checkAnswer = () => {
        const test = {
            ...this.filteredTests()[this.state.testIndex],
            answers: this.filteredTests()[this.state.testIndex].answers.map(
                answer => answer.toLowerCase()
            )
        };
        this.setState({ showWrong: false });
        if (test.answers.includes(this.state.answer.toLowerCase().trim())) {
            let nextIndex = this.getNextIndex();
            this.setState({
                answer: "",
                noOfMistakes: 0,
                showAnswer: false,
                testIndex: nextIndex,
                question: this.getQuestion(nextIndex),
                noOfRights:
                    this.state.noOfRights + (this.state.showAnswer ? 0 : 1)
            });
        } else {
            let mistakes = ++this.state.noOfMistakes;
            if (mistakes > 2) {
                this.setState({
                    noOfMistakes: 0,
                    showAnswer: true,
                    answer: this.randomizeHint(),
                    showWrong: false,
                    noOfWrongs: this.state.noOfWrongs + 1
                });
            } else {
                this.setState({
                    showWrong: true,
                    noOfMistakes: mistakes
                });
            }
        }
        this.answerInput.focus();
    };

    getQuestion = index => {
        const questions = this.filteredTests()[index].questions;
        const question = this.randomArrayItem(questions);
        const helper = this.filteredTests()[index].helper || '';
        return `${question} ${helper}`;
    };

    handleOnKeyPress = e => {
        if (e.key === "Enter") {
            this.checkAnswer();
        }
    };

    toggleEditMode = () => {
        if (!this.props.editMode) {
            this.props.toggleEditModeCallback(
                this.filteredTests()[this.state.testIndex]
            );
        } else {
            this.props.toggleEditModeCallback();
            this.answerInput.focus();
        }
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <div>
                        <div className="game"
                            style={{
                                backgroundColor: theme.panelBackground,
                                borderRadius: theme.rounded,
                            }}>
                            <div className="question" style={{ color: theme.textColor }}>{this.state.question}</div>
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
                                    style={{
                                        borderBottomColor: theme.mainColor,
                                        backgroundColor: theme.inputColor
                                    }}
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
                                {this.props.toggleEditModeCallback && (
                                    <div
                                        className="buttons-icon"
                                        onClick={this.toggleEditMode}
                                    >
                                        <Icon
                                            icon={ICONS.EDIT}
                                            size={30}
                                            color={
                                                this.props.editMode
                                                    ? theme.secondColor
                                                    : theme.textColor
                                            }
                                        />
                                    </div>
                                )}
                                <div
                                    className="buttons-icon"
                                    onClick={this.toggleExcludeLearned}
                                >
                                    <Icon
                                        icon={ICONS.SUBSET}
                                        size={30}
                                        color={
                                            this.state.excludeLearned
                                                ? theme.secondColor
                                                : theme.textColor
                                        }
                                    />
                                </div>
                                <div className="buttons-icon" onClick={this.toggleGame}>
                                    <Icon
                                        icon={ICONS.RESET}
                                        size={30}
                                        color={theme.textColor}
                                    />
                                </div>
                                <div className="button" 
                                    onClick={this.checkAnswer}
                                    style={{
                                        backgroundColor: theme.panelBackground,
                                        color: theme.textColor
                                    }}>
                                    Verify
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Game;
