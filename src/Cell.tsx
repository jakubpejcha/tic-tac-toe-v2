import React from 'react';

interface Props {
	index: number,
	showClassName: string,
	takenByPlayer: string,
	currentPlayer: string,
	winning: boolean,
	size:string,
	onClickCallback: (index: number) => void
};

const Cell = ({ index, showClassName, takenByPlayer, currentPlayer, winning, size, onClickCallback }: Props) => {

	const handleOnClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (typeof e.currentTarget.dataset.index === 'undefined') return null;
		onClickCallback(+e.currentTarget.dataset.index);
	}

	return (
		<div className="board__cell-wrapper">
			<div
				data-index={index}
				className={`board__cell-content board__cell board__cell${size}${showClassName}${currentPlayer}${takenByPlayer}${winning ? ' winning' : ''}`}
				onClick={handleOnClick}
			/>
			<div className={`board__cell-content board__cell--backface board__cell--backface${size}${takenByPlayer}${winning ? ' winning' : ''}`} />
		</div>
	)
};

export default Cell;
