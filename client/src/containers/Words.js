import React from 'react';
import axios from 'axios-es6';
import Game from '../components/Game';
import AddWord from '../components/AddWord';
import Toggle from '../components/Toggle';
import Splash from '../components/Splash';
import Auth from '../modules/Auth';

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            toEnglish: true,
            selectedWordForEdit: {},
            editMode: false,
            loading: false
        };

        this.addWord = this.addWord.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleToFrom = this.toggleToFrom.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ loading: true });

        let config = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + Auth.getToken()
            }
        };

        axios.get('/api/words', config).then(response => {
            console.log(response);
        });

        axios.get('/openapi/words', {}).then(response => {
            this.setState({
                tests: this.shuffleArray(
                    response.data.words.map(item => {
                        return {
                            helper: item.helper,
                            questions: this.state.toEnglish
                                ? item.swedish
                                : item.english,
                            answers: this.state.toEnglish
                                ? item.english
                                : item.swedish,
                            learned: item.learned
                        };
                    })
                ),
                loading: false
            });
        });
    }

    shuffleArray (arr) {
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
            .post('/openapi/words', { oldWord: oldWord, newWord: newWord })
            .then(() => {
                this.setState({ loading: false });
            });
        this.loadData();
        this.toggleEditMode();
    }

    toggleEditMode(word) {
        let w = {},
            editMode = false;
        if (word) {
            w.english = this.state.toEnglish ? word.answers : word.questions;
            w.swedish = this.state.toEnglish ? word.questions : word.answers;
            w.helper = word.helper || '';
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
                    learned: item.learned
                };
            }),
            toEnglish: !this.state.toEnglish
        });
    }

    render() {
        return (
            <div>
                {this.state.loading && <Splash />}
                <Toggle
                    items={['to english', 'to swedish']}
                    callback={this.toggleToFrom}
                    isOn={this.state.toEnglish}
                />
                <Game
                    tests={this.state.tests}
                    toggleEditModeCallback={this.toggleEditMode}
                    editMode={this.state.editMode}
                />
                <AddWord
                    callback={this.addWord}
                    selectedWordForEdit={this.state.selectedWordForEdit}
                    editMode={this.state.editMode}
                />
            </div>
        );
    }
}

export default Words;
