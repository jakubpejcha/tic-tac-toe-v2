import React, { useState, useContext } from 'react';

const themes = {
    color: 'color',
    grey: 'grey',
} as const;

type Theme = 'color' | 'grey';

interface Props {
    children: React.ReactNode;
}

const ThemeContext = React.createContext<Theme>(themes.color);
const ThemeUpdateContext = React.createContext<() => void>(() => {});

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

const ThemeContextWrapper = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>(themes.color);

    const handleThemeChange = () => {
        setTheme((prev) => {
            if (prev === themes.color) {
                return themes.grey;
            } else {
                return themes.color;
            }
        });
    };
    return (
        <ThemeContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={handleThemeChange}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextWrapper;
