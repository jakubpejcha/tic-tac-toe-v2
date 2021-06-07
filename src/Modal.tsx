import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './styles/Modal.css';

interface Props {
	isWinner: boolean,
	isDraw: boolean,
	winner: string
}

const Modal = ({ isWinner, isDraw, winner }: Props) => {
	const [isHidden, setIsHidden] = useState(true);

	// useEffect(() => {
	// 	setIsHidden(!(isWinner || isDraw));
	// }, [isWinner, isDraw]);

	const portal: HTMLElement | null = document.getElementById('modalPortal');

	let text: string = '';
	if (isWinner) text = `Vyhrává hráč ${winner}`;
	if (isDraw) text = "Došlo k remíze"

	return (
		portal ?
		ReactDom.createPortal(
			<>
				<div className={`modal${ isHidden ? '' : ' show' }`}>
					<div className="modal__message">
						{text}
					</div>
				</div>
			</>,
			portal
		) :
		null
	)
}

export default Modal;
