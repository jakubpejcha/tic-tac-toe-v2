export interface CellInterface {
    showClassName: string;
    takenByPlayer: string;
    winning: boolean;
}

export interface ScoreInterface {
    [index: string]: number;
    x: number;
    o: number;
}

export interface BoardContextInterface {
    restartHandler: () => void;
    moveHandler: () => (() => void) | undefined;
    clickHandler: (index: number) => void;
    handleRestart: (restart: boolean) => void;
}

export interface Dimensions {
    BOARD_NUM_ROWS: number;
    SIZE: string;
    DELAY: number;
    WIN_STREAK: number;
}

export type Player = 'x' | 'o';

export interface Route {
    prependUrl: boolean;
    path: string;
    title: string;
}
