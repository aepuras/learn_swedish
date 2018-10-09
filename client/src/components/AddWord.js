import React, { Component } from "react";
import "./AddWord.css";

class AddWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            english: ["", "", ""],
            swedish: ["", "", ""]
        };
    }

    printRow = index => {
        return (
            <div className="wordRow" key={index}>
                <div>
                    <input
                        placeholder=":english"
                        type="text"
                        id={`english-${index}`}
                        name={`english-${index}`}
                        onChange={this.onChange}
                        value={this.state.english[index]}
                    />
                </div>
                <div>
                    <input
                        placeholder=":swedish"
                        type="text"
                        id={`swedish-${index}`}
                        name={`swedish-${index}`}
                        onChange={this.onChange}
                        value={this.state.swedish[index]}
                    />
                </div>
            </div>
        );
    };

    onChange = e => {
        const arr = e.target.name.split("-");
        const stateValue = this.state[arr[0]];
        stateValue[arr[1]] = e.target.value;
        this.setState({ [arr[0]]: stateValue });
    };

    save = () => {
        //validate
        this.props.callback(this.state);
        this.setState({
            english: ["", "", ""],
            swedish: ["", "", ""]
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="settings">
                    <div className="title">Add word</div>
                    <div className="item">
                        <div className="wordRows">
                            {[0, 1, 2].map(index => {
                                return this.printRow(index);
                            })}
                        </div>
                    </div>
                </div>
                <div className="addWord">
                    <div className="button" onClick={this.save}>
                        Save
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddWord;
