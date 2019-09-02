import React from "react";

export const languages = {
    english: {
        name: "english",
        common: "Common",
        irregular: "Irregular",
        words: "words",
        verbs: "verbs",
        stats: "stats",
    },
    romanian: {
        name: "romanian",
        common: "Comune",
        irregular: "Neregulate",
        words: "cuvinte",
        verbs: "verbe",
        stats: "statistici",
    },
};

export const LanguageContext = React.createContext({
    language: languages.english,
    toggleLanguage: () => {},
});
