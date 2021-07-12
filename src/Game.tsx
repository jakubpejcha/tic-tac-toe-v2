import React, { useState } from 'react';
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

  const handleRestart = (restart: boolean) => {
    setRestart(restart);
  }

  // const unsetRestart = () => {
  //   setRestart(false);
  // }

  type GameParams = {
    mode: string,
    type: string
  }

  const { mode: size, type } = useParams<GameParams>();

  return (
      <div className={`app-container app-container--${theme}`}>
        <Restart onClickHandler={handleRestart} theme={theme} />
        <ThemeToggler
          theme={theme}
          onClickHandler={handleThemeChange}
        />
        <Score score={score} theme={theme} />
        <Board
          scoreHandler={handleScoreUpdate}
          restart={restart}
          handleRestart={handleRestart}
          size={+size}
          isAI={type === 'pvc'}
        />
      </div>
  );
};

export default Game;
