import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';
import { ICONS } from '../constants.js';
import {ThemeContext} from '../theme-context';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };

        this.toggleVisible = this.toggleVisible.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    toggleVisible () {
        this.setState({ visible: !this.state.visible });
    }

    itemClick (e) {
        switch (e.currentTarget.innerHTML) {
        case 'words':
            this.props.callback('words');
            break;
        case 'verbs':
            this.props.callback('verbs');
            break;
        default:
            this.props.callback('words');
            break;
        }
        this.toggleVisible();
    }

    themeClick (e, toggleTheme){
        toggleTheme(e.currentTarget.innerHTML);
        this.toggleVisible();
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({theme, toggleTheme}) => (
                    <header 
                        className={classnames('header', { showMenu: this.state.visible })}
                        style={{backgroundColor: theme.mainColor}}
                    >
                        <div className="logo">
                            <Icon icon={ICONS.FLAME} size={30} color={theme.secondColor} />
                        </div>
                        <div className="menu-icon" onClick={this.toggleVisible}>
                            <span className="navicon" style={{backgroundColor: theme.secondColor}}>
                                <span className="navicon-before" style={{backgroundColor: theme.secondColor}} />
                                <span className="navicon-after" style={{backgroundColor: theme.secondColor}} />
                            </span>
                        </div>
                        <ul className="menu" style={{ 
                            backgroundColor: theme.panelBackground,
                            color: theme.textColor
                        }}>
                            <li className="title" style={{ 
                                backgroundColor: theme.secondColor,
                                color: theme.mainColor
                            }}>Game Type</li>
                            <li onClick={this.itemClick} className={classnames({active: this.props.selectedType === 'words'})}>words</li>
                            <li onClick={this.itemClick} className={classnames({active: this.props.selectedType === 'verbs'})}>verbs</li>
                            <li className="title" style={{ 
                                backgroundColor: theme.secondColor,
                                color: theme.mainColor
                            }}>Language</li>
                            <li onClick={this.itemClick}>english</li>
                            <li onClick={this.itemClick}>romanian</li>
                            <li className="title" style={{ 
                                backgroundColor: theme.secondColor,
                                color: theme.mainColor
                            }}>Theme</li>
                            <li onClick={(e) => {this.themeClick(e, toggleTheme);}} className={classnames({active: theme.name === 'blue'})}>blue</li>
                            <li onClick={(e) => {this.themeClick(e, toggleTheme);}} className={classnames({active: theme.name === 'light'})}>light</li>
                            <li onClick={(e) => {this.themeClick(e, toggleTheme);}} className={classnames({active: theme.name === 'dark'})}>dark</li>
                        </ul>
                    </header>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Header;
