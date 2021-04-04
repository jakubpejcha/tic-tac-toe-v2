import React from 'react';

interface Props {
	showClassName: string
};

const Cell = ({ showClassName }: Props) => {
	return (
		<div className={`board__cell${showClassName}`}>
		</div>
	)
};

export default Cell;
