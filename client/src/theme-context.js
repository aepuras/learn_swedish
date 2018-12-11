import React from "react";

export const themes = {
    blue: {
        name: 'blue',
        mainColor: '#0070af',
        secondColor: '#FFCA08',
        textColor: '#fff',
        textColorInverted: '#0070af',
        panelBackground: '#0083c5',
        rounded: '0.5em',
        inputColor: "rgb(152, 186, 202)"
    },
    light: {
        name: 'light',
        mainColor: '#fff',
        secondColor: '#f3c1c1',
        textColor: '#676767',
        textColorInverted: '#fff',
        panelBackground: '#c5ccde',
        rounded: '5px',
        inputColor: "#ddd"
    },
    dark: {
        name: 'dark',
        mainColor: '#1e1e1e',
        secondColor: '#757575',
        textColor: '#c7c7c7',
        textColorInverted: '#c7c7c7',
        panelBackground: '#383838',
        rounded: '5px',
        inputColor: "#ddd"
    }
}

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: themeName => {},
});

