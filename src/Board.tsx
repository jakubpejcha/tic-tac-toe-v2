import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { CellInterface } from './shared/interfaces'

const BOARD_NUM_ROWS = 10;
const DELAY = 1000 / (2 * BOARD_NUM_ROWS);

const Board = () => {

	const [winner, setWinner] = useState<boolean | string>(false);

	const [player, setPlayer] = useState('x');

	const [cells, setCells] = useState<CellInterface[]>(Array(BOARD_NUM_ROWS * BOARD_NUM_ROWS).fill({
		showClassName: '',
		takenByPlayer: '',
	}));

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

			return newCells;
		}));

		setPlayer((prevPlayer) => {
			if (prevPlayer === 'x') return 'o';
			return 'x';
		});
	};

	// If we have a winner, anounce it to the user
	useEffect(() => {
		if (winner) document.querySelector('.modal')?.classList.add('show');
	}, [winner]);

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
