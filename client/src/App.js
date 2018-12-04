import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import MainPage from "./containers/MainPage";
import {ThemeContext, themes} from './theme-context';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.toggleTheme = themeName => {
          this.setState(state => ({
            theme: themes[themeName]
          }));
        };
    
        this.state = {
          theme: themes.white,
          toggleTheme: this.toggleTheme,
        };
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

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeContext.Consumer>
                    {({theme}) => (
                        <div className="App" style={{background: theme.mainColor}}>
                            <Route exact path="/" component={MainPage} />
                            <Route exact path="/login" component={LoginPage} />
                        </div>
                    )}
                </ThemeContext.Consumer>
            </ThemeContext.Provider>
        );
    }
}

export default App;
