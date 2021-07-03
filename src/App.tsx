import React, { useState } from 'react';
import './styles/App.css';
import Board from './Board';
import ThemeToggler from './ThemeToggler';
import { ScoreInterface } from './shared/interfaces';
import Score from './Score';
import Restart from './Restart';

const App = () => {

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

  return (
      <div className={`app-container app-container--${theme}`}>
        <Restart onClickHandler={handleRestart} theme={theme} />
        <ThemeToggler
          theme={theme}
          onClickHandler={handleThemeChange}
        />
        <Score score={score} theme={theme} />
        <Board scoreHandler={handleScoreUpdate} restart={restart} unsetRestart={unsetRestart} />
      </div>
  );
};

export default App;
