import './styles/Welcome.css';
import GameMenu from './GameMenu';
import Back from './Back';
import GuestForm from './GuestForm';
import {
	Link,
	Route,
	Switch,
	useRouteMatch
} from 'react-router-dom';

type RouteType = {
	path: string,
	url: string
}

const Welcome = () => {
	const { path, url } = useRouteMatch<RouteType>();
	
	return (
		<div className="welcome">
			<h1 className="welcome__title">TIC TAC TOE</h1>
			<div className="welcome__menu">
				<Switch>
					<Route path={`${path}/mode-3`}>
						<GameMenu>
							<Back goToPath={null} />
							<li>
								<Link to="/game/3/pvp">Player vs Player (hot-seat)</Link>
							</li>
							<li>
								<Link to="/game/3/pvp-socket?player=x">Player vs Player (remote)</Link>
							</li>
							<li>
								<Link to={`${url}/3/form/guest`}>Player vs Player (join friend)</Link>
							</li>
							<li>
								<Link to="/game/3/pvc">Player vs AI</Link>
							</li>
						</GameMenu>
					</Route>
					<Route path={`${path}/mode-10`}>
						<GameMenu>
							<Back goToPath={null} />
							<li>
								<Link to="/game/10/pvp">Player vs Player (hot-seat)</Link>
							</li>
							<li>
								<Link to="/game/10/pvp-socket?player=x">Player vs Player (remote)</Link>
							</li>
							<li>
								<Link to={`${url}/10/form/guest`}>Player vs Player (join friend)</Link>
							</li>
						</GameMenu>
					</Route>
					<Route path={`${path}/:mode/form/guest`}>
						<GuestForm>
							<Back goToPath={null} />
						</GuestForm>
					</Route>
					<Route path={path}>
						<GameMenu>
							<li>
								<Link to={`${url}/mode-3`}>3 x 3 mode (includes AI opponent)</Link>
							</li>
							<li>
								<Link to={`${url}/mode-10`}>10 x 10 mode</Link>
							</li>
						</GameMenu>
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default Welcome;
