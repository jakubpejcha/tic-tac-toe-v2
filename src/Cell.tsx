import React from 'react';

interface Props {
	index: number,
	showClassName: string,
	takenByPlayer: string,
	currentPlayer: string,
	onClickCallback: (index: number) => void
};

const Cell = ({ index, showClassName, takenByPlayer, currentPlayer, onClickCallback }: Props) => {

	const handleOnClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (typeof e.currentTarget.dataset.index === 'undefined') return null;
		onClickCallback(+e.currentTarget.dataset.index);
	}

	return (
		<div
			data-index={index}
			className={`board__cell${showClassName}${currentPlayer}${takenByPlayer}`}
			onClick={handleOnClick}
		/>
	)
};

export default Cell;
