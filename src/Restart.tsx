import React from 'react';
import './styles/Restart.css';

interface Props {
	onClickHandler: () => void,
	theme: string,
}

const Restart = ({ onClickHandler, theme }: Props) => {
	return (
		<button className={`restart restart--${theme}`} onClick={onClickHandler}>
			<span>Hrát znovu</span>
		</button>
	)
}

export default Restart;
