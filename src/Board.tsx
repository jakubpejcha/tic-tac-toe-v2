import { useState, useEffect } from 'react';
import Cell from './Cell';
import { CellInterface } from './shared/interfaces';
import { checkWinner } from './checkWinner';
import { findBestMove } from './minimax';
import Modal from './Modal';
import './styles/Board.css';

interface Dimensions {
    BOARD_NUM_ROWS: number;
    SIZE: string;
    DELAY: number;
    WIN_STREAK: number;
}

const getDimensions = (numRows: number): Dimensions => {
    const dimensions = {
        BOARD_NUM_ROWS: numRows,
        SIZE: '',
        DELAY: 0,
        WIN_STREAK: 0,
    };

    if (numRows === 3) dimensions.SIZE = '--small';
    if (numRows === 10) dimensions.SIZE = '--large';

    if (numRows === 3) dimensions.DELAY = 150;
    if (numRows === 10) dimensions.DELAY = 10;

    dimensions.WIN_STREAK = numRows >= 5 ? 5 : numRows;

    return dimensions;
};

interface Props {
    scoreHandler: (updatePlayer: string) => void;
    restart: boolean;
    handleRestart: (restart: boolean) => void;
    size: number;
    isAI: boolean;
}

const Board = ({ scoreHandler, restart, handleRestart, size, isAI }: Props) => {
    const dimensions = getDimensions(size);

    const [isWinner, setIsWinner] = useState(false);

    const [isDraw, setIsDraw] = useState(false);

    const [numMoves, setNumMoves] = useState(0);

    const [player, setPlayer] = useState('x');

    const [cells, setCells] = useState<CellInterface[]>(
        Array(dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS).fill({
            showClassName: '',
            takenByPlayer: '',
            winning: false,
        })
    );

    const [lastCell, setLastCell] = useState(-1);

    // restart board
    useEffect(() => {
        if (!restart) return;

        setIsWinner(false);
        setIsDraw(false);
        setNumMoves(0);
        setPlayer('x');

        cells.forEach((cell, index) => {
            setCells((prevCells) => {
                const newCells = [...prevCells];

                newCells[index] = {
                    ...cell,
                    takenByPlayer: '',
                    winning: false,
                };

                return newCells;
            });
        });

        setLastCell(-1);

        handleRestart(false);
    }, [restart]);

    // Nice animation of creating the board
    const showBoard = () => {
        cells.forEach((cell, index) => {
            setTimeout(() => {
                setCells((prevCells) => {
                    const newCells = [...prevCells];

                    newCells[index] = {
                        ...cell,
                        showClassName: ' show',
                    };

                    return newCells;
                });
            }, index * dimensions.DELAY);
        });
    };

    useEffect(() => {
        showBoard();
    }, []);

    const onCellClick = (index: number) => {
        setCells((prevCells) => {
            // in case cell has been clicked before
            if (prevCells[index].takenByPlayer !== '' || isWinner)
                return prevCells;

            const newCells = [...prevCells];

            newCells[index] = {
                ...prevCells[index],
                takenByPlayer: ` ${player}`,
            };

            setNumMoves((prevNum) => prevNum + 1);
            setLastCell(index);

            return newCells;
        });
    };

    useEffect(() => {
        //TEST
        if (lastCell === -1) return; // do not run after app starts

        const result: boolean | number[] = checkWinner(
            cells,
            player,
            dimensions.BOARD_NUM_ROWS,
            lastCell,
            dimensions.WIN_STREAK
        );

        if (result && Array.isArray(result)) {
            setIsWinner(true);
            scoreHandler(player);
            setCells((prevCells) => {
                const newCells = [...prevCells];
                result.forEach((cell) => {
                    newCells[cell] = {
                        ...prevCells[cell],
                        winning: true,
                    };
                });

                return newCells;
            });
            return;
        }
        //console.log(checkWinner(cells, player, dimensions.BOARD_NUM_ROWS, lastCell, dimensions.WIN_STREAK));

        // check for draw
        if (
            numMoves ===
            dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS
        ) {
            setIsDraw(true);
            return;
        }

        setPlayer((prevPlayer) => {
            if (prevPlayer === 'x') return 'o';
            return 'x';
        });
    }, [lastCell]);

    //AI move
    useEffect(() => {
        if (player === 'o' && isAI) {
            setCells((prevCells) => {
                // in case cell has been clicked before
                // forAI
                const boardData = {
                    cells: prevCells,
                    currentPlayer: 'o',
                    size: dimensions.BOARD_NUM_ROWS,
                    lastCellIndex: lastCell,
                    winStreak: dimensions.WIN_STREAK,
                };

                const index = findBestMove(boardData);

                const newCells = [...prevCells];

                newCells[index] = {
                    ...prevCells[index],
                    takenByPlayer: ' o',
                };

                setNumMoves((prevNum) => prevNum + 1);
                setLastCell(index);

                return newCells;
            });
        }
    }, [player]);

    return (
        <>
            <div className={`board board_${dimensions.BOARD_NUM_ROWS}`}>
                {cells.map((cell, pos) => (
                    <Cell
                        key={pos}
                        index={pos}
                        showClassName={cell.showClassName}
                        takenByPlayer={cell.takenByPlayer}
                        winning={cell.winning}
                        currentPlayer={` current_${player}`}
                        size={dimensions.SIZE}
                        onClickCallback={onCellClick}
                    />
                ))}
            </div>
            <Modal isWinner={isWinner} isDraw={isDraw} winner={player} />
        </>
    );
};

export default Board;
