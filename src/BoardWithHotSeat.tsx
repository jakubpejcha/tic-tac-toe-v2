import { useContext, useEffect } from 'react';
import { BoardContext } from './contextProvider';
import {
    CellInterface,
    BoardContextInterface,
    Dimensions,
    Player,
} from './shared/types';
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
}

const BoardWithHotSeat = (props: Props) => {
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
        console.log(props.isWinner);

        moveHandler();
        console.log(props.isWinner);
    }, [moveHandler]);

    useEffect(() => {
        console.log('Hot-seat mounted');

        return () => {
            console.log('Hot-seat unmounted');
        };
    }, []);

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

export default BoardWithHotSeat;
