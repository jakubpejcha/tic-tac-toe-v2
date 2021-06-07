import React from 'react';
import './styles/ThemeToggler.css';

interface Props {
	theme: string,
	onClickHandler: () => void
}

const ThemeToggler = ({ theme, onClickHandler }: Props) => {
	return (
		<div
			className={`theme-toggler theme-toggler--${theme}`}
			onClick={onClickHandler}
			title="Přepnout vzhled"
		/>
	)
}

export default ThemeToggler;
