import React, { Component } from 'react';
import Verbs from './Verbs';
import Words from './Words';
import Header from '../components/Header';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameType: 'words'
        };

        this.setType = this.setType.bind(this);
    }

    setType(value) {
        this.setState({
            gameType: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header callback={this.setType} selectedType={this.state.gameType} />
                {this.state.gameType === 'words' ? (
                    <Words />
                ) : (
                    <Verbs />
                )}
            </React.Fragment>
        );
    }
}

export default MainPage;
