import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Icon from "./Icon";
import { ICONS } from "../constants.js";
import { ThemeContext } from "../theme-context";
import { LanguageContext } from "../language-context";
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };

        this.toggleVisible = this.toggleVisible.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    toggleVisible() {
        this.setState({ visible: !this.state.visible });
    }

    itemClick(e) {
        this.props.callback(e.currentTarget.id);
        this.toggleVisible();
    }

    contextClick(e, toggleContext) {
        toggleContext(e.currentTarget.innerHTML);
        this.toggleVisible();
    }

    renderMenuIcon(theme) {
        return (
            <div className="menu-icon" onClick={this.toggleVisible}>
                <span
                    className="navicon"
                    style={{
                        backgroundColor: theme.secondColor,
                    }}
                >
                    <span
                        className="navicon-before"
                        style={{
                            backgroundColor: theme.secondColor,
                        }}
                    />
                    <span
                        className="navicon-after"
                        style={{
                            backgroundColor: theme.secondColor,
                        }}
                    />
                </span>
            </div>
        );
    }

    renderMenuTitle(caption, theme) {
        return (
            <li
                className="title"
                style={{
                    backgroundColor: theme.secondColor,
                    color: theme.mainColor,
                }}
            >
                {caption}
            </li>
        );
    }

    renderContextTypeItem(caption, ctx, ctxCallback) {
        return (
            <li
                onClick={e => {
                    this.contextClick(e, ctxCallback);
                }}
                className={classnames({
                    active: ctx.name === caption,
                })}
            >
                {caption}
            </li>
        );
    }

    renderItem(page, language) {
        return (
            <li
                id={page}
                onClick={this.itemClick}
                className={classnames({
                    active: this.props.selectedType === page,
                })}
            >
                {language[page]}
            </li>
        );
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <LanguageContext.Consumer>
                        {({ language, toggleLanguage }) => (
                            <header
                                className={classnames("header", {
                                    showMenu: this.state.visible,
                                })}
                                style={{ backgroundColor: theme.mainColor }}
                            >
                                <div className="logo">
                                    <Icon
                                        icon={ICONS.FLAME}
                                        size={30}
                                        color={theme.secondColor}
                                    />
                                </div>
                                {this.renderMenuIcon(theme)}
                                <ul
                                    className="menu"
                                    style={{
                                        backgroundColor: theme.panelBackground,
                                        color: theme.textColor,
                                    }}
                                >
                                    {/* -------------------------------------------------------------- */}
                                    {this.renderMenuTitle("Game", theme)}
                                    {this.renderItem("words", language)}
                                    {this.renderItem("verbs", language)}
                                    {this.renderItem("stats", language)}

                                    {/* -------------------------------------------------------------- */}
                                    {this.renderMenuTitle("Language", theme)}
                                    {this.renderContextTypeItem(
                                        "english",
                                        language,
                                        toggleLanguage
                                    )}
                                    {this.renderContextTypeItem(
                                        "romanian",
                                        language,
                                        toggleLanguage
                                    )}

                                    {/* -------------------------------------------------------------- */}
                                    {this.renderMenuTitle("Theme", theme)}
                                    {this.renderContextTypeItem(
                                        "blue",
                                        theme,
                                        toggleTheme
                                    )}
                                    {this.renderContextTypeItem(
                                        "light",
                                        theme,
                                        toggleTheme
                                    )}
                                    {this.renderContextTypeItem(
                                        "dark",
                                        theme,
                                        toggleTheme
                                    )}
                                    {this.renderMenuTitle("Account", theme)}
                                    <li>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>
                            </header>
                        )}
                    </LanguageContext.Consumer>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Header;
