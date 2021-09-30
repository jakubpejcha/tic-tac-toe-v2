import { CellInterface } from './shared/types';

const getColumn = (
    size: number,
    index: number,
    winStreak: number
): number[] => {
    const rowNumber = Math.floor(index / size) + 1;

    const offsetUp = rowNumber < winStreak ? rowNumber - 1 : winStreak - 1;
    const offsetDown =
        size - rowNumber < winStreak ? size - rowNumber : winStreak - 1;

    let column: number[] = [];
    // up
    for (let i = offsetUp; i > 0; i--) {
        column.push(index - i * size);
    }

    column.push(index);

    //down
    for (let i = 1; i <= offsetDown; i++) {
        column.push(index + i * size);
    }

    return column;
};

const getRow = (size: number, index: number, winStreak: number): number[] => {
    const columnNumber = (index % size) + 1;

    const offsetLeft =
        columnNumber < winStreak ? columnNumber - 1 : winStreak - 1;
    const offsetRight =
        size - columnNumber < winStreak ? size - columnNumber : winStreak - 1;

    let row: number[] = [];
    // left
    for (let i = offsetLeft; i > 0; i--) {
        row.push(index - i);
    }

    row.push(index);

    //down
    for (let i = 1; i <= offsetRight; i++) {
        row.push(index + i);
    }

    return row;
};

const getDiagonalUpRight = (
    size: number,
    index: number,
    winStreak: number
): number[] => {
    const rowNumber = Math.floor(index / size) + 1;
    const columnNumber = (index % size) + 1;

    const offsetUp = rowNumber < winStreak ? rowNumber - 1 : winStreak - 1;
    const offsetDown =
        size - rowNumber < winStreak ? size - rowNumber : winStreak - 1;

    const offsetLeft =
        columnNumber < winStreak ? columnNumber - 1 : winStreak - 1;
    const offsetRight =
        size - columnNumber < winStreak ? size - columnNumber : winStreak - 1;

    // guard column

    let diagonal: number[] = [];
    // up-right below
    for (let i = offsetDown; i > 0; i--) {
        if (i > offsetLeft) continue;
        diagonal.push(index + i * size - i);
    }

    diagonal.push(index);

    // up-right above
    for (let i = 1; i <= offsetUp; i++) {
        if (i > offsetRight) break;
        diagonal.push(index - i * size + i);
    }

    return diagonal;
};

const getDiagonalDownRight = (
    size: number,
    index: number,
    winStreak: number
): number[] => {
    const rowNumber = Math.floor(index / size) + 1;
    const columnNumber = (index % size) + 1;

    const offsetUp = rowNumber < winStreak ? rowNumber - 1 : winStreak - 1;
    const offsetDown =
        size - rowNumber < winStreak ? size - rowNumber : winStreak - 1;

    const offsetLeft =
        columnNumber < winStreak ? columnNumber - 1 : winStreak - 1;
    const offsetRight =
        size - columnNumber < winStreak ? size - columnNumber : winStreak - 1;

    let diagonal: number[] = [];
    // down-right above
    for (let i = offsetUp; i > 0; i--) {
        if (i > offsetLeft) continue;
        diagonal.push(index - i * size - i);
    }

    diagonal.push(index);

    // down-right below
    for (let i = 1; i <= offsetDown; i++) {
        if (i > offsetRight) break;
        diagonal.push(index + i * size + i);
    }

    return diagonal;
};

const checkMoves = (
    array: CellInterface[],
    currentPlayer: string,
    size: number,
    index: number,
    winStreak: number,
    callbackDirection: (
        size: number,
        index: number,
        winStreak: number
    ) => number[]
): boolean | number[] => {
    const direction = callbackDirection(size, index, winStreak);

    let streak = 0;
    const winningCells: number[] = [];
    const length = direction.length;

    for (let i = 0; i < length; i++) {
        streak++;
        winningCells.push(direction[i]);

        if (
            array[direction[i]].takenByPlayer === '' ||
            array[direction[i]].takenByPlayer.trim() !== currentPlayer
        ) {
            streak = 0;
            winningCells.length = 0;
        }

        if (streak === winStreak) return winningCells;
    }

    return false;
};

export const checkWinner = (
    array: CellInterface[],
    currentPlayer: string,
    size: number,
    index: number,
    winStreak: number
): boolean | number[] => {
    if (index === -1) return false;

    return (
        checkMoves(array, currentPlayer, size, index, winStreak, getColumn) ||
        checkMoves(array, currentPlayer, size, index, winStreak, getRow) ||
        checkMoves(
            array,
            currentPlayer,
            size,
            index,
            winStreak,
            getDiagonalUpRight
        ) ||
        checkMoves(
            array,
            currentPlayer,
            size,
            index,
            winStreak,
            getDiagonalDownRight
        ) ||
        false
    );
};
