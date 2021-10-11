import './styles/App.css';
import Game from './Game';
import Welcome from './Welcome';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import ThemeContextWrapper from './ThemeContextWrapper';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/game/:mode/:type'>
                    <ThemeContextWrapper>
                        <Game />
                    </ThemeContextWrapper>
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
