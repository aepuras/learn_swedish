import React from "react";

export const themes = {
    blue: {
        name: 'blue',
        mainColor: '#0070af',
        secondColor: '#FFCA08',
        textColor: '#fff',
        panelBackground: '#0083c5',
        rounded: '0.5em',
        inputColor: "rgb(152, 186, 202)"
    },
    white: {
        name: 'white',
        mainColor: '#fff',
        secondColor: '#f3c1c1',
        textColor: '#676767',
        panelBackground: '#c5ccde',
        rounded: '5px',
        inputColor: "#ddd"
    }
}

export const ThemeContext = React.createContext({
    theme: themes.blue,
    toggleTheme: themeName => {},
});

