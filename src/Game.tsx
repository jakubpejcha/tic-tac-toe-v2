import { useState } from 'react';
import Board from './Board';
import SocketBoard from './SocketBoard';
import ThemeToggler from './ThemeToggler';
import { ScoreInterface } from './shared/interfaces';
import Score from './Score';
import Restart from './Restart';
import Back from './Back';
import { useParams, useLocation } from 'react-router-dom';

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

  type GameParams = {
    mode: string,
    type: string,
    // player?: string,
    // guest?: string
  }

  const { mode: size, type } = useParams<GameParams>();


  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  
  const query = useQuery();
  console.log(query.get('guest'));

  return (
      <div className={`app-container app-container--${theme}`}>
        <Back goToPath={null} />
        <Restart onClickHandler={handleRestart} theme={theme} />
        <ThemeToggler
          theme={theme}
          onClickHandler={handleThemeChange}
        />
        <Score score={score} theme={theme} />
        {type === 'pvp-socket' &&
          <SocketBoard
            scoreHandler={handleScoreUpdate}
            restart={restart}
            handleRestart={handleRestart}
            size={+size}
            player={query.get('player') ?? ''}
            guest={query.get('guest') ?? ''}
          />
        }
        {type !== 'pvp-socket' &&
          <Board
            scoreHandler={handleScoreUpdate}
            restart={restart}
            handleRestart={handleRestart}
            size={+size}
            isAI={type === 'pvc'}
          />
        }
      </div>
  );
};

export default Game;
