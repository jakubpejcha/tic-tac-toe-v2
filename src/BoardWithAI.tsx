import { useContext, useEffect } from 'react';
import { BoardContext } from './contextProvider';
import {
    CellInterface,
    BoardContextInterface,
    Dimensions,
    Player,
} from './shared/types';
import { findBestMove } from './minimax';
import Cell from './Cell';
import Modal from './Modal';

interface Props {
    isModal: boolean;
    player: Player;
    currentPlayer: Player;
    cells: CellInterface[];
    dimensions: Dimensions;
    isWinner: boolean;
    isDraw: boolean;
    lastCell: number;
}

const BoardWithAI = (props: Props) => {
    const { clickHandler, restartHandler, moveHandler } = useContext(
        BoardContext
    ) as BoardContextInterface;

    const onCellClick = (index: number) => {
        clickHandler(index);
    };

    // restart board
    useEffect(() => {
        restartHandler();
    }, [restartHandler]);

    useEffect(() => {
        moveHandler();
    }, [moveHandler]);

    //AI move
    useEffect(() => {
        if (props.player === 'o') {
            const boardData = {
                cells: props.cells,
                currentPlayer: props.player,
                size: props.dimensions.BOARD_NUM_ROWS,
                lastCellIndex: props.lastCell,
                winStreak: props.dimensions.WIN_STREAK,
            };
            const index = findBestMove(boardData);

            // simulate AI click
            if (index !== -1) {
                clickHandler(index);
            }
        }
    }, [props.player]);

    return (
        <>
            <div className={`board board_${props.dimensions.BOARD_NUM_ROWS}`}>
                {props.cells.map((cell, pos) => (
                    <Cell
                        key={pos}
                        index={pos}
                        showClassName={cell.showClassName}
                        takenByPlayer={cell.takenByPlayer}
                        winning={cell.winning}
                        currentPlayer={` current_${props.player}`}
                        size={props.dimensions.SIZE}
                        onClickCallback={onCellClick}
                    />
                ))}
            </div>
            {props.isModal && (
                <Modal
                    isWinner={props.isWinner}
                    isDraw={props.isDraw}
                    winner={props.currentPlayer}
                />
            )}
        </>
    );
};

export default BoardWithAI;
