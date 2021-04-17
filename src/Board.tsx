import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { CellInterface } from './shared/interfaces';
import { checkWinner } from './checkWinner';
import Modal from './Modal';

const BOARD_NUM_ROWS = 3;
const DELAY = 1000 / (2 * BOARD_NUM_ROWS);
const WIN_STREAK = BOARD_NUM_ROWS >= 5 ? 5 : BOARD_NUM_ROWS;

const Board = () => {

	const [isWinner, setIsWinner] = useState(false);

	const [isDraw, setIsDraw] = useState(false);

	const [numMoves, setNumMoves] = useState(0);

	const [player, setPlayer] = useState('x');

	const [cells, setCells] = useState<CellInterface[]>(Array(BOARD_NUM_ROWS * BOARD_NUM_ROWS).fill({
		showClassName: '',
		takenByPlayer: '',
	}));

	const [lastCell, setLastCell] = useState(-1);

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
			}, index * 0);//DELAY
		});
	};

	useEffect(() => {
		showBoard();
	}, []);

	const onCellClick = (index: number) => {	
		setCells((prevCells => {
			// in case cell has been clicked before
			if (prevCells[index].takenByPlayer !== '') return prevCells;

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
		
		if (checkWinner(cells, player, BOARD_NUM_ROWS, lastCell, WIN_STREAK)) {
			setIsWinner(true);
			return;
		}

		// check for draw
		if (numMoves === BOARD_NUM_ROWS * BOARD_NUM_ROWS) {
			setIsDraw(true);
			return;
		};

		setPlayer((prevPlayer) => {
			if (prevPlayer === 'x') return 'o';
			return 'x';
		});

	}, [lastCell]);

	return (
		<>
			<div className={`board board_${BOARD_NUM_ROWS}`}>
				{cells.map((cell, pos) => (
					<Cell
						key={pos}
						index={pos}
						showClassName={cell.showClassName}
						takenByPlayer={cell.takenByPlayer}
						currentPlayer={` current_${player}`}
						onClickCallback={onCellClick}
					/>
				))}
			</div>
			<Modal isWinner={isWinner} isDraw={isDraw} winner={player} />
		</>
	)
};

export default Board;
