import React, { useState } from 'react';
import './styles/App.css';
import Game from './Game';
import Welcome from './Welcome';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

const themes = {
    color: 'color',
    grey: 'grey',
} as const;

type Theme = 'color' | 'grey';

export const ThemeContext = React.createContext<Theme>(themes.color);

const App = () => {
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
        <Router>
            <Switch>
                <Route path='/game/:mode/:type'>
                    <ThemeContext.Provider value={theme}>
                        <Game themeHandler={handleThemeChange} />
                    </ThemeContext.Provider>
                </Route>
                <Route path='/welcome'>
                    <Welcome />
                </Route>
                <Route path='/'>
                    <Redirect to='/welcome' />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
