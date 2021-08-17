import './styles/GameMenu.css';

interface Props {
    children: React.ReactNode;
}

const GameMenu = (props: Props) => {
    return <ul className='game-menu'>{props.children}</ul>;
};

export default GameMenu;
