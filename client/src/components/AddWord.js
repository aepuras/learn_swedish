import React, { Component } from "react";
import { ThemeContext } from '../theme-context';
import "./AddWord.css";

class AddWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newWord: this.createEmptyWord()
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedWordForEdit !== this.props.selectedWordForEdit) {
            if (this.props.editMode) {
                this.setState({
                    newWord: {
                        english: this.fixArray(
                            this.props.selectedWordForEdit.english
                        ),
                        swedish: this.fixArray(
                            this.props.selectedWordForEdit.swedish
                        ),
                        helper: this.props.selectedWordForEdit.helper || "",
                        learned: this.props.selectedWordForEdit.learned || false
                    }
                });
            } else {
                this.setState({ newWord: this.createEmptyWord() });
            }
        }
    }

    fixArray = arr => {
        return ["", "", ""].map((val, index) => {
            return arr.length >= index + 1 ? arr[index] : val;
        });
    };

    printRow = (index, theme) => {
        return (
            <div className="wordRow" key={index}>
                <div>
                    <input
                        placeholder=":english"
                        type="text"
                        id={`english-${index}`}
                        name={`english-${index}`}
                        onChange={this.onChange}
                        value={this.state.newWord.english[index]}
                        style={{
                            borderBottomColor: theme.mainColor,
                            backgroundColor: theme.inputColor
                        }}
                    />
                </div>
                <div>
                    <input
                        placeholder=":swedish"
                        type="text"
                        id={`swedish-${index}`}
                        name={`swedish-${index}`}
                        onChange={this.onChange}
                        value={this.state.newWord.swedish[index]}
                        style={{
                            borderBottomColor: theme.mainColor,
                            backgroundColor: theme.inputColor
                        }}
                    />
                </div>
            </div>
        );
    };

    createEmptyWord = () => {
        return {
            english: ["", "", ""],
            swedish: ["", "", ""],
            helper: "",
            learned: false
        };
    };

    onChange = event => {
        let field = event.target.name;
        let index = -1;

        if (event.target.name.indexOf("-") > 0) {
            const arr = event.target.name.split("-");
            field = arr[0];
            index = arr[1];
        }

        const value = event.target.value;
        const newWord = this.state.newWord;

        if (index > -1) {
            newWord[field][index] = value;
        } else {
            newWord[field] =
                event.target.type === "checkbox" ? event.target.checked : value;
        }

        this.setState({
            newWord
        });
    };

    save = () => {
        //validate
        const englishWordsCount = this.state.newWord.english.filter(word => word !== '').length;
        const swedishWordCount = this.state.newWord.swedish.filter(word => word !== '').length;
        if (englishWordsCount === 0 || swedishWordCount === 0) {
            return false;
        }

        this.props.callback(this.props.selectedWordForEdit, this.state.newWord);
        this.setState({ newWord: this.createEmptyWord() });
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <React.Fragment>
                        <div className="settings" 
                            style={{
                                backgroundColor: theme.secondColor,
                                borderRadius: theme.rounded
                            }}>
                            <div className="title" style={{ color: theme.mainColor }}>
                                {this.props.editMode ? "Edit" : "Add"} word
                            </div>
                            <div className="item" style={{ backgroundColor: theme.panelBackground }}>
                                <div className="wordRows">
                                    {[0, 1, 2].map(index => this.printRow(index, theme))}
                                    <div className="wordRow">
                                        <div>
                                            <input
                                                placeholder=":helper"
                                                type="text"
                                                id="helper"
                                                name="helper"
                                                value={this.state.newWord.helper}
                                                onChange={this.onChange}
                                                style={{
                                                    borderBottomColor: theme.mainColor,
                                                    backgroundColor: theme.inputColor
                                                }}
                                            />
                                        </div>
                                        <div className="learned">
                                            <label style={{ color: theme.textColor }}>
                                                <input
                                                    type="checkbox"
                                                    name="learned"
                                                    checked={this.state.newWord.learned}
                                                    value={this.state.newWord.learned}
                                                    onChange={this.onChange}
                                                />
                                                learned
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="addWord">
                            <div className="button" 
                                onClick={this.save}
                                style={{
                                    backgroundColor: theme.panelBackground,
                                    color: theme.textColor
                                }}>
                                Save
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default AddWord;
