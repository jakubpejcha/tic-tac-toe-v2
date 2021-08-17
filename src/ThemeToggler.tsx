import { useContext } from 'react';
import { ThemeContext } from './App';
import './styles/ThemeToggler.css';

interface Props {
    onClickHandler: () => void;
}

const ThemeToggler = ({ onClickHandler }: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <div
            className={`theme-toggler theme-toggler--${theme}`}
            onClick={onClickHandler}
            title='Toggle theme'
        />
    );
};

export default ThemeToggler;
