import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { CellInterface } from './shared/interfaces';
import { checkWinner } from './checkWinner';

const BOARD_NUM_ROWS = 10;
const DELAY = 1000 / (2 * BOARD_NUM_ROWS);
const WIN_STREAK = BOARD_NUM_ROWS >= 5 ? 5 : BOARD_NUM_ROWS;

const Board = () => {

	const [winner, setWinner] = useState<boolean | string>(false);

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
			}, index * DELAY);
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

	// If we have a winner, anounce it to the user
	useEffect(() => {
		if (winner) document.querySelector('.modal')?.classList.add('show');
	}, [winner]);

	// check for draw
	useEffect(() => {
		if (!winner && numMoves === BOARD_NUM_ROWS * BOARD_NUM_ROWS) {
			const modalMessageElem = document.querySelector('.modal > .modal__message');
			
			if (!modalMessageElem) return;// TODO: some error message display
			modalMessageElem.textContent = 'Remíza';

			document.querySelector('.modal')?.classList.add('show');
		};
	}, [numMoves])

	useEffect(() => {
		//TEST
		if (lastCell === -1) return; // do not run after app starts
		
		checkWinner(cells, player, BOARD_NUM_ROWS, lastCell, WIN_STREAK);

		setPlayer((prevPlayer) => {
			if (prevPlayer === 'x') return 'o';
			return 'x';
		});

	}, [lastCell]);

	return (
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
	)
};

export default Board;
