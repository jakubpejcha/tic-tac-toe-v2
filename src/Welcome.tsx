import './styles/Welcome.css';
import GameMenu from './GameMenu';
import Back from './Back';
import GuestForm from './GuestForm';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { pages as MainRoutes } from './GameRoutes/main';
import { pages as Mode10Routes } from './GameRoutes/mode10';
import { pages as Mode3Routes } from './GameRoutes/mode3';
import GameRouteLink from './GameRouteLink';

type RouteType = {
    path: string;
    url: string;
};

const Welcome = () => {
    const { path, url } = useRouteMatch<RouteType>();

    return (
        <div className='welcome'>
            <h1 className='welcome__title'>TIC TAC TOE</h1>
            <div className='welcome__menu'>
                <Switch>
                    <Route path={`${path}/mode-3`}>
                        <GameMenu>
                            <Back goToPath={null} />
                            {Mode3Routes.map((route) => (
                                <GameRouteLink
                                    key={`${route.prependUrl}-${route.title}`}
                                    rootUrl={url}
                                    prependUrl={route.prependUrl}
                                    path={route.path}
                                    title={route.title}
                                />
                            ))}
                        </GameMenu>
                    </Route>
                    <Route path={`${path}/mode-10`}>
                        <GameMenu>
                            <Back goToPath={null} />
                            {Mode10Routes.map((route) => (
                                <GameRouteLink
                                    key={`${route.prependUrl}-${route.title}`}
                                    rootUrl={url}
                                    prependUrl={route.prependUrl}
                                    path={route.path}
                                    title={route.title}
                                />
                            ))}
                        </GameMenu>
                    </Route>
                    <Route path={`${path}/:mode/form/guest`}>
                        <GuestForm>
                            <Back goToPath={null} />
                        </GuestForm>
                    </Route>
                    <Route path={path}>
                        <GameMenu>
                            {MainRoutes.map((route) => (
                                <GameRouteLink
                                    key={`${route.prependUrl}-${route.title}`}
                                    rootUrl={url}
                                    prependUrl={route.prependUrl}
                                    path={route.path}
                                    title={route.title}
                                />
                            ))}
                        </GameMenu>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Welcome;
