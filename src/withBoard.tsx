import { useState, useEffect, useCallback } from 'react';
import { CellInterface, Dimensions, Player } from './shared/types';
import { checkWinner } from './checkWinner';
import { BoardContext } from './contextProvider';
import './styles/Board.css';

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
    hostPlayer?: Player;
    guestId?: string;
    restartRef?: React.RefObject<HTMLButtonElement>;
}

interface PassThroughProps {
    isModal: boolean;
    player: Player;
    currentPlayer: Player;
    cells: CellInterface[];
    dimensions: Dimensions;
    isWinner: boolean;
    isDraw: boolean;
    lastCell: number;
    hostPlayer?: Player;
    guestId?: string;
    restartRef?: React.RefObject<HTMLButtonElement>;
}

const withBoard = (
    Component: (passThroughProps: PassThroughProps) => JSX.Element
) => {
    let numMoves = 0;
    let lastCell = -1;
    let dimensions: Dimensions;
    let isWinner = false;
    let isDraw = false;
    let currentPlayer: Player = 'x';

    return ({
        scoreHandler,
        restart,
        handleRestart,
        size,
        hostPlayer,
        guestId,
        restartRef,
    }: Props) => {
        dimensions = getDimensions(size);

        const [isModal, setIsModal] = useState(false);

        const [player, setPlayer] = useState<Player>('x');

        const [cells, setCells] = useState<CellInterface[]>(
            Array(dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS).fill({
                showClassName: '',
                takenByPlayer: '',
                winning: false,
            })
        );

        console.log('hrac: ', player);

        const showModal = () => {
            setIsModal(true);
        };

        const hideModal = () => {
            setIsModal(false);
        };

        // Nice animation of creating the board
        useEffect(() => {
            const buildBoard = () => {
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

            buildBoard();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const restartHandler = useCallback(() => {
            if (!restart) return () => {};

            isWinner = false;
            isDraw = false;
            hideModal();
            numMoves = 0;
            lastCell = -1;
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

            handleRestart(false);
        }, [restart]);

        const moveHandler = useCallback(() => {
            if (lastCell === -1 || isWinner || isDraw) return () => {};

            const handleModalShow = () => {
                setTimeout(() => {
                    showModal();

                    setTimeout(() => {
                        hideModal();
                    }, 2000);
                }, 1000);
            };

            const result = checkWinner(
                cells,
                currentPlayer,
                dimensions.BOARD_NUM_ROWS,
                lastCell,
                dimensions.WIN_STREAK
            );

            if (result && Array.isArray(result)) {
                isWinner = true;
                handleModalShow();
                scoreHandler(currentPlayer);
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
                return () => {};
            }

            // check for draw
            if (
                numMoves ===
                dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS
            ) {
                isDraw = true;
                console.log('draw');

                handleModalShow();
                return () => {};
            }
        }, [cells, scoreHandler]);

        const clickHandler = useCallback(
            (index) => {
                //TODO: ? maybe not increment after game over?
                numMoves++;
                lastCell = index;
                // console.log(numMoves);

                setCells((prevCells) => {
                    // in case cell has been clicked before
                    if (prevCells[index].takenByPlayer !== '' || isWinner)
                        return prevCells;

                    const newCells = [...prevCells];

                    newCells[index] = {
                        ...prevCells[index],
                        takenByPlayer: ` ${player}`,
                    };

                    return newCells;
                });
                currentPlayer = player;
                console.log('currentPlayer: ', currentPlayer);

                // Do not swap players after game over
                if (
                    numMoves <
                    dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS
                ) {
                    setPlayer((prevPlayer) => {
                        if (prevPlayer === 'x') return 'o';
                        return 'x';
                    });
                }
            },
            [player]
        );

        const passThroughProps: PassThroughProps = {
            isModal,
            player,
            currentPlayer,
            cells,
            dimensions,
            isWinner,
            isDraw,
            lastCell,
            hostPlayer,
            guestId,
            restartRef,
        };

        return (
            <BoardContext.Provider
                value={{
                    restartHandler,
                    moveHandler,
                    clickHandler,
                    handleRestart,
                }}
            >
                <Component {...passThroughProps} />
            </BoardContext.Provider>
        );
    };
};

export default withBoard;
