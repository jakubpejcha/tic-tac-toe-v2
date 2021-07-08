import './styles/App.css';
import Game from './Game';
import Welcome from './Welcome';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
 } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/game/:type">
					<Game />
				</Route>
				<Route path="/welcome">
					<Welcome />
				</Route>
				<Route path="/">
					<Redirect to="/welcome" />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;