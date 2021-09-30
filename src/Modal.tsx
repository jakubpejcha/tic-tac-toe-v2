//import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './styles/Modal.css';

interface Props {
    isWinner: boolean;
    isDraw: boolean;
    winner: string;
}

let text = '';

const Modal = ({ isWinner, isDraw, winner }: Props) => {
    const portal = document.getElementById('modalPortal') as HTMLDivElement;

    if (isWinner) text = `Player ${winner} wins!!!`;
    if (isDraw) text = 'Draw!!!';

    return ReactDom.createPortal(
        <>
            <div className='modal'>
                <div className='modal__message'>{text}</div>
            </div>
        </>,
        portal
    );
};

export default Modal;
