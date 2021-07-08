import React, { useState } from 'react';
import AIBoard from './AIBoard';
import Board from './Board';
import ThemeToggler from './ThemeToggler';
import { ScoreInterface } from './shared/interfaces';
import Score from './Score';
import Restart from './Restart';
import { useParams } from 'react-router-dom';

const Game = () => {

  const [themeGrey, setThemeGrey] = useState(false);

  const theme = themeGrey ? 'grey' : 'color';
  
  const [score, setScore] = useState<ScoreInterface>({ 'x': 0, 'o': 0 });

  const [restart, setRestart] = useState(false);

  const handleThemeChange = () => {
    setThemeGrey(prev => !prev)
  }

  const handleScoreUpdate = (updatePlayer: string) => {
    setScore(prevScore => {
      return {
        ...prevScore,
        [updatePlayer]: prevScore[updatePlayer] + 1,
      }
    });
  }

  const handleRestart = () => {
    setRestart(true);
  }

  const unsetRestart = () => {
    setRestart(false);
  }

  type GameParams = {
    type: string
  }

  const { type } = useParams<GameParams>();

  return (
      <div className={`app-container app-container--${theme}`}>
        <Restart onClickHandler={handleRestart} theme={theme} />
        <ThemeToggler
          theme={theme}
          onClickHandler={handleThemeChange}
        />
        <Score score={score} theme={theme} />
        {type === 'pvp' && <Board scoreHandler={handleScoreUpdate} restart={restart} unsetRestart={unsetRestart} />}
        {type === 'pvc' && <AIBoard scoreHandler={handleScoreUpdate} restart={restart} unsetRestart={unsetRestart} />}
      </div>
  );
};

export default Game;
