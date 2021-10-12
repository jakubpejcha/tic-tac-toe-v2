import { Route } from '../shared/types';

export const pages: Route[] = [
    {
        prependUrl: false,
        path: 'game/10/pvp',
        title: 'Player vs Player (hot-seat)',
    },
    {
        prependUrl: false,
        path: 'game/10/pvp-socket?player=x',
        title: 'Player vs Player (remote)',
    },
    {
        prependUrl: true,
        path: '10/form/guest',
        title: 'Player vs Player (join friend)',
    },
];
