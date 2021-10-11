import React from 'react';
import { useTheme } from './ThemeContextWrapper';
import './styles/Restart.css';

interface Props {
    onClickHandler: (restart: boolean) => void;
}

const Restart = React.forwardRef(
    ({ onClickHandler }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const theme = useTheme();

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
