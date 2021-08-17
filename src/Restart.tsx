import { useContext } from 'react';
import { ThemeContext } from './App';
import './styles/Restart.css';

interface Props {
    onClickHandler: (restart: boolean) => void;
}

const Restart = ({ onClickHandler }: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <button
            className={`restart restart--${theme}`}
            onClick={() => onClickHandler(true)}
        >
            <span>Clear board</span>
        </button>
    );
};

export default Restart;
