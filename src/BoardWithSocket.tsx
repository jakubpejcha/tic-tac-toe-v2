import { useContext, useEffect, useState } from 'react';
import { BoardContext } from './contextProvider';
import {
    CellInterface,
    BoardContextInterface,
    Dimensions,
    Player,
} from './shared/types';
import Cell from './Cell';
import Modal from './Modal';
import Invite from './Invite';
import { io } from 'socket.io-client';

interface Props {
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

// interface SocketCellUpdateData {
//     lastIndex: number;
//     opponent: Player;
//     numMoves: number;
// }

let socket = io();

const onSocketConnected = () => {
    console.log('connected');
};

const onSocketDisconnected = () => {
    console.log('disconnected');
};

const handleServerDisconnect = (reason: string) => {
    console.log('disconnected: ', reason);
};

let opponent: Player;
let thisPlayer: Player;
let lobbyId: string;
let emitRestart = true;

const BoardWithSocket = (props: Props) => {
    const { clickHandler, restartHandler, moveHandler, handleRestart } =
        useContext(BoardContext) as BoardContextInterface;

    const [canMove, setCanMove] = useState(true);

    const onCellClick = (index: number) => {
        if (canMove) {
            clickHandler(index);
        }
    };
    console.log(props.player);

    // const handleSocketCellUpdate = (cellIndex: number) => {
    //     // only simulate opponents click
    //     // pass index
    //     console.log(props.player);

    //     // TODO: changing player twice, it is shared variable
    //     // calling an "old instance"???
    //     clickHandler(cellIndex);
    //     // change player back
    //     //playerHandler();
    //     setCanMove(true);
    // };

    //inits
    useEffect(() => {
        // const initOpponent = () => {
        //     if (props.hostPlayer === 'o') opponent = 'x';
        //     opponent = 'o';
        // };

        // initOpponent();

        socket = io('http://localhost:3002', {
            autoConnect: false,
            query: {
                host: props.guestId as string,
            },
        });

        socket.connect();

        socket.on('connect', onSocketConnected);

        socket.on('disconnect', onSocketDisconnected);

        socket.on('server_disconnected', handleServerDisconnect);

        const handleInitiator = (id: string) => {
            setCanMove(id === socket.id);
            lobbyId = id;
            if (id === socket.id) {
                opponent = 'o';
                thisPlayer = 'x';
            } else {
                opponent = 'x';
                thisPlayer = 'o';
            }
        };

        socket.on('initiator', handleInitiator);

        const handleSocketRestart = () => {
            // TODO: here restart is false!
            //handleRestart(true);
            //restartHandler();
            console.log('socketRestart');
            emitRestart = false;
            props.restartRef!.current!.click();
            //emitRestart = true;
            setCanMove(socket.id === lobbyId);
        };

        socket.on('restart', handleSocketRestart);

        return () => {
            socket.disconnect();
            socket.off('connect', onSocketConnected);
            socket.off('disconnect', onSocketDisconnected);
            socket.off('server_disconnected', handleServerDisconnect);
            socket.off('initiator', handleInitiator);
            socket.off('restart', handleSocketRestart);
        };
    }, []);

    useEffect(() => {
        const handleSocketCellUpdate = (cellIndex: number) => {
            // only simulate opponents click
            clickHandler(cellIndex);
            setCanMove(true);
        };
        socket.on('cell_update', handleSocketCellUpdate);
        return () => {
            socket.off('cell_update', handleSocketCellUpdate);
        };
    }, [clickHandler]);

    // restart board
    useEffect(() => {
        restartHandler();
        setCanMove(socket.id === lobbyId);
        if (emitRestart) {
            socket.emit('restart');
        }
        emitRestart = true;
    }, [restartHandler]);

    useEffect(() => {
        if (props.lastCell === -1) return () => {};
        moveHandler();

        // only emit if the click was manual
        if (canMove) {
            socket.emit('cell_update', props.lastCell);
            setCanMove(false);
        }
    }, [moveHandler]);

    return (
        <>
            {!canMove && !props.isWinner && !props.isDraw && (
                <div className='move-note'>
                    <span>{`Player ${opponent}'s turn!`}</span>
                </div>
            )}
            <Invite
                roomId={socket.id}
                isInitiator={socket.id === lobbyId}
                hostId={lobbyId}
            />
            <div className={`board board_${props.dimensions.BOARD_NUM_ROWS}`}>
                {props.cells.map((cell, pos) => (
                    <Cell
                        key={pos}
                        index={pos}
                        showClassName={cell.showClassName}
                        takenByPlayer={cell.takenByPlayer}
                        winning={cell.winning}
                        currentPlayer={` current_${thisPlayer}`}
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

export default BoardWithSocket;
