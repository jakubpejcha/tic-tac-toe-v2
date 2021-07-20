import { useState, useEffect } from 'react';
import Cell from './Cell';
import { CellInterface } from './shared/interfaces';
import { checkWinner } from './checkWinner';
import Modal from './Modal';
import './styles/Board.css';
import { io } from 'socket.io-client';

interface Dimensions {
	BOARD_NUM_ROWS: number,
	SIZE: string,
	DELAY: number,
	WIN_STREAK: number
}

interface SocketCellUpdateData {
  lastIndex: number,
  opponent: string,
  numMoves: number
}

const getDimensions = (numRows: number): Dimensions => {
	const dimensions = {
		BOARD_NUM_ROWS: numRows,
		SIZE: '',
		DELAY: 0,
		WIN_STREAK: 0
	}

	if (numRows === 3) dimensions.SIZE = '--small';
	if (numRows === 10) dimensions.SIZE = '--large';

	if (numRows === 3) dimensions.DELAY = 150;
	if (numRows === 10) dimensions.DELAY = 10;

	dimensions.WIN_STREAK = numRows >= 5 ? 5 : numRows;

	return dimensions;
}

interface Props {
	scoreHandler: (updatePlayer: string) => void,
	restart: boolean,
	handleRestart: (restart: boolean) => void,
	size: number,
	player: string,
	guest: string
}

// const socket = io("http://localhost:3001", {
//   autoConnect: false
// });
let socket: any;

const onSocketConnected = () => {
  console.log('connected');
}

const onSocketDisconnected = () => {
  console.log('disconnected');
}

const handleServerDisconnect = (reason: string) => {
  console.log(reason);
}


const SocketBoard = ({ scoreHandler, restart, handleRestart, size, player, guest }: Props) => {
	let opponent = 'o';
	if (player === 'o') opponent = 'x';

	
	// const url = guest !== '' ? `http://localhost:3001/${guest}` : 'http://localhost:3001';
	// console.log(url);
	
	


	const dimensions = getDimensions(size);

	const [isWinner, setIsWinner] = useState(false);

  	const [winner, setWinner] = useState(player);

	const [isDraw, setIsDraw] = useState(false);

	const [numMoves, setNumMoves] = useState(0);

	//const [player, setPlayer] = useState('x');
  // if set to true, this player can move
  	const [opponentMoved, setOpponentMoved] = useState(true);

	const [cells, setCells] = useState<CellInterface[]>(Array(dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS).fill({
		showClassName: '',
		takenByPlayer: '',
		winning: false,
	}));

	const [lastCell, setLastCell] = useState(-1);

  const handleSocketCellUpdate = (data: SocketCellUpdateData) => {
    console.log('updating cells');
    console.table(data);
    
    setCells((prevCells) => {
      const newCells = [...prevCells];

      newCells[data.lastIndex].takenByPlayer = ` ${data.opponent}`;

      return newCells;
    });

    setNumMoves(data.numMoves);

    // set opponent moved
    setOpponentMoved(true);
  }

  const handleInitiator = (initiator: string) => {
    setOpponentMoved(socket.id === initiator);
  }

  const handleSocketWinner = ({player, result}: {player: string, result: number[]}) => {
    setIsWinner(true);
    scoreHandler(player);
    setWinner(player);
    setCells((prevCells) => {
      	const newCells = [...prevCells];

      //if (Array.isArray(result)) {
        console.log('winning cells');
        
        result.forEach(cell => {
          newCells[cell] = {
            ...prevCells[cell],
            winning: true,
            takenByPlayer: ` ${player}`
          };
        });
      //}
      

      return newCells;
    });
  }

  const handleSocketDraw = (lastIndex: number) => {
		setIsDraw(true);
		setCells((prevCells) => {
			const newCells = [...prevCells];

			newCells[lastIndex].takenByPlayer = ` ${opponent}`;

			return newCells;
		});
  }

  const handleSocketRestart = () => {
	handleRestart(true);
  }

  // establish connection on game start
  useEffect(() => {

	socket = io('http://localhost:3001', {
		autoConnect: false,
		query: {
			host: guest
		}
	});

    socket.connect();

	//console.log(socket.id);

    socket.on('connect', onSocketConnected);

    socket.on('disconnect', onSocketDisconnected);

    socket.on('server_disconnected', handleServerDisconnect);

    socket.on('initiator', handleInitiator);

    socket.on('cell_update', handleSocketCellUpdate);

    socket.on('winner', handleSocketWinner);

	socket.on('draw', handleSocketDraw);

	socket.on('restart', handleSocketRestart);

    return () => {
      socket.disconnect();
      socket.off('connect', onSocketConnected);
      socket.off('disconnect', onSocketDisconnected);
      socket.off('cell_update', handleSocketCellUpdate);
      socket.off('server_disconnected', handleServerDisconnect);
      socket.off('initiator', handleInitiator);
      socket.off('winner', handleSocketWinner);
	  socket.off('draw', handleSocketDraw);
	  socket.off('restart', handleSocketRestart);
    }

  }, []);

	// restart board
	useEffect(() => {
		
		if (!restart) return;

		setIsWinner(false);
		setIsDraw(false);
		setNumMoves(0);
		//setPlayer('x');

		cells.forEach((cell, index) => {
			setCells(prevCells => {
				const newCells = [...prevCells];
	
				newCells[index] = {
					...cell,
					takenByPlayer: '',
					winning: false
				}

				return newCells;
			});
		});
		
		setLastCell(-1);

		handleRestart(false);

		socket.emit('restart');
		
	}, [restart]);

	// Nice animation of creating the board
	const showBoard = () => {

		cells.forEach((cell, index) => {
			setTimeout(() => {
				setCells((prevCells) => {
					const newCells = [...prevCells];
	
					newCells[index] = {
						...cell,
						showClassName: ' show'
					}
	
					return newCells;
				});
			}, index * dimensions.DELAY);
		});
	};

	useEffect(() => {
		showBoard();
	}, []);

	const onCellClick = (index: number) => {

    if (!opponentMoved) return;

		setCells((prevCells => {
			// in case cell has been clicked before
			if (prevCells[index].takenByPlayer !== '' || isWinner) return prevCells;

			const newCells = [...prevCells];

			newCells[index] = {
				...prevCells[index],
				takenByPlayer: ` ${player}`
			}

			setNumMoves(prevNum => prevNum + 1);
			setLastCell(index);
      
			return newCells;
		}));

	};

	useEffect(() => {
		//TEST
		if (lastCell === -1) return; // do not run after app starts
    

		const result = checkWinner(cells, player, dimensions.BOARD_NUM_ROWS, lastCell, dimensions.WIN_STREAK);
		
		if (result && Array.isArray(result)) {
			setIsWinner(true);
			scoreHandler(player);
			setCells((prevCells) => {
				const newCells = [...prevCells];
				result.forEach(cell => {
					newCells[cell] = {
						...prevCells[cell],
						winning: true,
					};
				});

				return newCells;
			});

			socket.emit('winner', {player, result});

			return;
		}
		

		// check for draw
		if (numMoves === dimensions.BOARD_NUM_ROWS * dimensions.BOARD_NUM_ROWS) {
			setIsDraw(true);

			socket.emit('draw', lastCell);

			return;
		};



		const socketData: SocketCellUpdateData = {
			lastIndex: lastCell,
			opponent: player,
			numMoves: numMoves
		}
		socket.emit('cell_update', socketData);

		// set opponent moved
		setOpponentMoved(false);

	}, [lastCell]);

	return (
		<>
			{!opponentMoved && !isWinner && !isDraw && <div className="move-note"><span>{`Player ${opponent}'s turn!`}</span></div>}
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
			<Modal isWinner={isWinner} isDraw={isDraw} winner={winner} />
		</>
	)
};

export default SocketBoard;