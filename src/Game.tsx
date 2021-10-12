import { useState, useCallback, useRef } from 'react';
import { useTheme } from './ThemeContextWrapper';
import withBoard from './withBoard';
import BoardWithHotSeat from './BoardWithHotSeat';
import BoardWithAI from './BoardWithAI';
import BoardWithSocket from './BoardWithSocket';
import ThemeToggler from './ThemeToggler';
import { ScoreInterface, Player } from './shared/types';
import Score from './Score';
import Restart from './Restart';
import Back from './Back';
import { useParams, useLocation } from 'react-router-dom';
import './styles/layout.css';

// TODO: this does not change on mode change
const WithHotSeat = withBoard(BoardWithHotSeat);
const WithAI = withBoard(BoardWithAI);
const WithSocket = withBoard(BoardWithSocket);

const Game = () => {
    const theme = useTheme();

    const [score, setScore] = useState<ScoreInterface>({ x: 0, o: 0 });

    const [restart, setRestart] = useState(false);

    const restartRef = useRef<HTMLButtonElement>(null);

    const handleScoreUpdate = useCallback((updatePlayer: string) => {
        setScore((prevScore) => {
            return {
                ...prevScore,
                [updatePlayer]: prevScore[updatePlayer] + 1,
            };
        });
    }, []);

    const handleRestart = useCallback((restart: boolean) => {
        setRestart(restart);
    }, []);

    type GameParams = {
        mode: string;
        type: string;
    };

    const { mode: size, type } = useParams<GameParams>();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();

    return (
        <div className={`app-container app-container--${theme}`}>
            <Back goToPath={null} />
            <ThemeToggler />
            <div className='middle'>
                <Score score={score} />
                {type === 'pvp-socket' && (
                    <WithSocket
                        scoreHandler={handleScoreUpdate}
                        restart={restart}
                        handleRestart={handleRestart}
                        size={+size}
                        hostPlayer={
                            (query.get('player') ?? '') as Player | undefined
                        }
                        guestId={
                            (query.get('guest') ?? '') as string | undefined
                        }
                        restartRef={restartRef}
                    />
                )}
                {type === 'pvp' && (
                    <WithHotSeat
                        scoreHandler={handleScoreUpdate}
                        restart={restart}
                        handleRestart={handleRestart}
                        size={+size}
                    />
                )}
                {type === 'pvc' && (
                    <WithAI
                        scoreHandler={handleScoreUpdate}
                        restart={restart}
                        handleRestart={handleRestart}
                        size={+size}
                    />
                )}
                <Restart onClickHandler={handleRestart} ref={restartRef} />
            </div>
        </div>
    );
};

export default Game;
