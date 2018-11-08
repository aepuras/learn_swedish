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
            toEnglish: true,
            selectedWordForEdit: {}
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get("/openapi/words", {}).then(
            function(response) {
                this.setState({
                    tests: this.shuffleArray(
                        response.data.words.map(item => {
                            return {
                                helper: item.helper,
                                questions: item.swedish,
                                answers: item.english,
                                learned: item.learned
                            };
                        })
                    ),
                    toEnglish: true
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

    addWord = (oldWord, newWord) => {
        axios.post("/openapi/words", { oldWord: oldWord, newWord: newWord });
        this.loadData();
        this.cancelEditMode();
    };

    editMode = word => {
        this.setState({
            selectedWordForEdit: {
                english: this.state.toEnglish ? word.answers : word.questions,
                swedish: this.state.toEnglish ? word.questions : word.answers,
                helper: word.helper || "",
                learned: word.learned || false
            }
        });
    };

    cancelEditMode = () => {
        this.setState({ selectedWordForEdit: {} });
    };

    toggleToFrom = () => {
        this.setState({
            tests: this.state.tests.map(item => {
                return {
                    helper: item.helper,
                    questions: item.answers,
                    answers: item.questions,
                    learned: item.learned
                };
            }),
            toEnglish: !this.state.toEnglish
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
                <Game tests={this.state.tests} editCallback={this.editMode} />
                <AddWord
                    callback={this.addWord}
                    selectedWordForEdit={this.state.selectedWordForEdit}
                    cancelCallback={this.cancelEditMode}
                />
            </div>
        );
    }
}

export default Words;