import { Route } from '../shared/types';

export const pages: Route[] = [
    {
        prependUrl: false,
        path: 'game/3/pvp',
        title: 'Player vs Player (hot-seat)',
    },
    {
        prependUrl: false,
        path: 'game/3/pvp-socket?player=x',
        title: 'Player vs Player (remote)',
    },
    {
        prependUrl: true,
        path: '3/form/guest',
        title: 'Player vs Player (join friend)',
    },
    {
        prependUrl: false,
        path: 'game/3/pvc',
        title: 'Player vs AI',
    },
];
