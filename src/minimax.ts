import { checkWinner } from './checkWinner';
import { CellInterface } from './shared/interfaces';

const evaluateBoard = (
    result: boolean | number[],
    isMaximizer: boolean
): number => {
    if (!result) {
        return 0;
    } else if (isMaximizer) {
        return 10;
    } else {
        return -10;
    }
};

const isMovesLeft = (cells: CellInterface[]) => {
    for (const cell of cells) {
        if (cell.takenByPlayer === '') return true;
    }
    return false;
};

const swapPlayers = (currentPlayer: string) => {
    if (currentPlayer === 'x') return 'o';
    return 'x';
};

interface BoardData {
    cells: CellInterface[];
    currentPlayer: string;
    size: number;
    lastCellIndex: number;
    winStreak: number;
}

// cells will be a copy
const minimax = (
    depth: number,
    boardData: BoardData,
    isMaximizer: boolean
): number => {
    const {
        cells: cellsCopy,
        currentPlayer,
        size,
        lastCellIndex,
        winStreak,
    } = boardData;

    const result = checkWinner(
        cellsCopy,
        currentPlayer,
        size,
        lastCellIndex,
        winStreak
    );
    const boardScore = evaluateBoard(result, isMaximizer);

    if (boardScore === 10) return boardScore;
    if (boardScore === -10) return boardScore;
    if (!isMovesLeft(cellsCopy)) return 0;

    // do not modify cells
    let best = -100;

    if (isMaximizer) {
        cellsCopy.forEach((cell, index) => {
            if (cell.takenByPlayer === '') {
                cell.takenByPlayer = swapPlayers(currentPlayer);
                //console.log(cellsCopy[index].takenByPlayer);

                const newBoardData: BoardData = {
                    ...boardData,
                    cells: cellsCopy,
                    currentPlayer: swapPlayers(currentPlayer),
                    lastCellIndex: index,
                };
                best = Math.max(
                    best,
                    minimax(depth + 1, newBoardData, !isMaximizer)
                );

                cell.takenByPlayer = '';
            }
        });
    } else {
        best = 100;

        cellsCopy.forEach((cell, index) => {
            if (cell.takenByPlayer === '') {
                cell.takenByPlayer = swapPlayers(currentPlayer);

                const newBoardData: BoardData = {
                    ...boardData,
                    cells: cellsCopy,
                    currentPlayer: swapPlayers(currentPlayer),
                    lastCellIndex: index,
                };
                best = Math.min(
                    best,
                    minimax(depth + 1, newBoardData, !isMaximizer)
                );

                cell.takenByPlayer = '';
            }
        });
    }

    return best;
};

export const findBestMove = (boardData: BoardData): number => {
    const { cells, currentPlayer, size, lastCellIndex, winStreak } = boardData;

    const cellsCopy = [...cells];
    const boardDataCopy = {
        ...boardData,
        cells: cellsCopy,
    };
    console.log('called finder');

    let bestValue = -100;
    let bestMove = -1;

    boardDataCopy.cells.forEach((cell, index) => {
        if (cell.takenByPlayer === '') {
            cell.takenByPlayer = currentPlayer;
            boardDataCopy.lastCellIndex = index;

            console.time('minimax');
            let moveValue = minimax(0, boardDataCopy, true);
            console.timeEnd('minimax');

            cell.takenByPlayer = '';

            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = index;
            }
        }
    });

    return bestMove;
};
