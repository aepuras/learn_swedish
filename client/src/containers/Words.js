import React from "react";
import axios from "axios-es6";
import { Redirect } from "react-router-dom";
import Game from "../components/Game";
import AddWord from "../components/AddWord";
import Toggle from "../components/Toggle";
import Splash from "../components/Splash";
import Auth from "../modules/Auth";

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            toEnglish: true,
            selectedWordForEdit: {},
            editMode: false,
            loading: false,
            authorized: true,
        };

        this.addWord = this.addWord.bind(this);
        this.saveStat = this.saveStat.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleToFrom = this.toggleToFrom.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    getAuthHeaders() {
        const config = {
            headers: {
                Authorization: "bearer " + Auth.getToken(),
            },
        };
        return config;
    }

    loadData() {
        this.setState({ loading: true });
        axios
            .get("/api/words", this.getAuthHeaders())
            .then(response => {
                this.setState({
                    tests: this.shuffleArray(
                        response.data.items.map(item => {
                            return {
                                helper: item.helper,
                                questions: this.state.toEnglish
                                    ? item.swedish
                                    : item.english,
                                answers: this.state.toEnglish
                                    ? item.english
                                    : item.swedish,
                                learned: item.learned,
                            };
                        })
                    ),
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    authorized: error.status !== 401,
                    loading: false,
                });
            });
    }

    shuffleArray(arr) {
        let a = arr.slice(0);
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    addWord(oldWord, newWord) {
        this.setState({ loading: true });
        axios
            .post(
                "/api/words",
                { oldWord: oldWord, newWord: newWord },
                this.getAuthHeaders()
            )
            .then(() => {
                this.setState({ loading: false });
            });
        this.loadData();
        this.toggleEditMode();
    }

    saveStat(wrongs, rights, mistakes) {
        axios
            .post(
                "/api/stats",
                {
                    game: `words (${
                        this.state.toEnglish ? "swe to eng" : "eng to swe"
                    })`,
                    wrongs: wrongs,
                    rights: rights,
                    mistakes: mistakes,
                    dateTaken: new Date(),
                },
                this.getAuthHeaders()
            )
            .then(() => {
                this.setState({ loading: false });
            });
    }

    toggleEditMode(word) {
        let w = {},
            editMode = false;
        if (word) {
            w.english = this.state.toEnglish ? word.answers : word.questions;
            w.swedish = this.state.toEnglish ? word.questions : word.answers;
            w.helper = word.helper || "";
            w.learned = word.learned || false;
            editMode = true;
        }

        this.setState({ selectedWordForEdit: w, editMode: editMode });
    }

    toggleToFrom() {
        this.setState({
            tests: this.state.tests.map(item => {
                return {
                    helper: item.helper,
                    questions: item.answers,
                    answers: item.questions,
                    learned: item.learned,
                };
            }),
            toEnglish: !this.state.toEnglish,
        });
    }

    printAuthorized() {
        return this.state.loading ? <Splash /> : this.printGame();
    }

    printGame() {
        return (
            <div>
                <Toggle
                    items={["to english", "to swedish"]}
                    callback={this.toggleToFrom}
                    isOn={this.state.toEnglish}
                />
                <Game
                    tests={this.state.tests}
                    toggleEditModeCallback={this.toggleEditMode}
                    editMode={this.state.editMode}
                    saveStatCallback={this.saveStat}
                />
                <AddWord
                    callback={this.addWord}
                    selectedWordForEdit={this.state.selectedWordForEdit}
                    editMode={this.state.editMode}
                />
            </div>
        );
    }

    render() {
        return this.state.authorized ? (
            this.printAuthorized()
        ) : (
            <Redirect to="/login" />
        );
    }
}

export default Words;
