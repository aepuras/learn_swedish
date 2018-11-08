import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import Verbs from "./containers/Verbs";
import Words from "./containers/Words";
import Toggle from "./components/Toggle";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verbsWordsToggle: true
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMounts() {
        document.addEventListener(
            "touchmove",
            function(e) {
                e.preventDefault();
            },
            this.isPassive()
                ? {
                      capture: false,
                      passive: false
                  }
                : false
        );
    }

    isPassive() {
        let supportsPassiveOption = false;
        try {
            document.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", {
                    get: function() {
                        supportsPassiveOption = true;
                    }
                })
            );
        } catch (e) {}
        return supportsPassiveOption;
    }

    toggle(value) {
        this.setState({
            verbsWordsToggle: value
        });
    }

    render() {
        return (
            <div className="App">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <React.Fragment>
                            <Toggle
                                items={["Verbs", "Words"]}
                                callback={this.toggle}
                                isOn={this.state.verbsWordsToggle}
                            />
                            {this.state.verbsWordsToggle ? (
                                <Verbs />
                            ) : (
                                <Words />
                            )}
                        </React.Fragment>
                    )}
                />
                <Route exact path="/login" component={LoginPage} />
            </div>
        );
    }
}

export default App;
