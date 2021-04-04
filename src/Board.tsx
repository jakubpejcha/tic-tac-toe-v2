import React, { useState, useEffect } from 'react';
import Cell from './Cell';

interface CellType {
	showClassName: string
}

const BOARD_NUM_ROWS = 3;
const DELAY = 1000 / (2 * BOARD_NUM_ROWS);


const Board = () => {

	const [cells, setCells] = useState(Array(BOARD_NUM_ROWS * BOARD_NUM_ROWS).fill({
		showClassName: ''
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

	return (
		<div className={`board board_${BOARD_NUM_ROWS}`}>
			{cells.map((cell:CellType, pos:number) => (
				<Cell
					key={pos}
					showClassName={cell.showClassName}
				/>
			))}
		</div>
	)
};

export default Board;
