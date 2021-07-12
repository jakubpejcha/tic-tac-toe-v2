import { ScoreInterface } from './shared/interfaces';
import './styles/Score.css'

interface Props {
	score: ScoreInterface,
	theme: string,
}

const Score = ( { score, theme }: Props) => {
	return (
		<div className={`score score--${theme}`}>
			<span className="score__title">SCORE:</span>
			<div className="score__table">
				<div className="score__row score__row--players">
					<span className="score__column--left">x</span>
					<span className="score__column--right">o</span>
				</div>
				<div className="score__row score__row--score">
					<span className="score__column--left">{score['x']}</span>
					<span className="score__column--right">{score['o']}</span>
				</div>
			</div>
		</div>
	)
}

export default Score;
