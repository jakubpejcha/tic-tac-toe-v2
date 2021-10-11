import { useTheme, useThemeUpdate } from './ThemeContextWrapper';
import './styles/ThemeToggler.css';

const ThemeToggler = () => {
    const theme = useTheme();
    const handleThemeChange = useThemeUpdate();

    return (
        <div
            className={`theme-toggler theme-toggler--${theme}`}
            onClick={handleThemeChange}
            title='Toggle theme'
        />
    );
};

export default ThemeToggler;
