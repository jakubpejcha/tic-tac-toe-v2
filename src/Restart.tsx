import './styles/Restart.css';

interface Props {
	onClickHandler: (restart: boolean) => void,
	theme: string,
}

const Restart = ({ onClickHandler, theme }: Props) => {
	return (
		<button className={`restart restart--${theme}`} onClick={() => onClickHandler(true)}>
			<span>Clear board</span>
		</button>
	)
}

export default Restart;
