import React, { useRef } from 'react';
import './styles/GuestForm.css';
import { useHistory, useParams } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const GuestForm = (props: Props) => {
    type GameParams = {
        mode: string;
        type: string;
    };

    const { mode: size } = useParams<GameParams>();

    const baseUrl = `/game/${size}/pvp-socket?player=o`;

    const inputRef = useRef<HTMLInputElement>(null);

    const history = useHistory();

    const handleJoinLobby = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        const inputValue = inputRef.current?.value;

        const url = `${baseUrl}&guest=${inputValue}`;

        history.push(url);
    };

    // using uncontrolled input comoponent
    return (
        <div className='form--guest'>
            {props.children}
            <div className='form--guest__row'>
                <input
                    id='lobbyIdInput'
                    className='form--guest__input'
                    placeholder='Lobby id'
                    type='text'
                    ref={inputRef}
                />
                <label htmlFor='lobbyIdInput' className='form--guest__label'>
                    Lobby id
                </label>
                <button
                    className='form--guest__button'
                    onClick={handleJoinLobby}
                >
                    Join
                </button>
            </div>
        </div>
    );
};

export default GuestForm;
