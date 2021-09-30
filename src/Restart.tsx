import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from './App';
import './styles/Restart.css';

interface Props {
    onClickHandler: (restart: boolean) => void;
}

const Restart = React.forwardRef(
    ({ onClickHandler }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const theme = useContext(ThemeContext);

        return (
            <button
                className={`restart restart--${theme}`}
                onClick={() => onClickHandler(true)}
                ref={ref}
            >
                <span>Clear board</span>
            </button>
        );
    }
);

export default Restart;
