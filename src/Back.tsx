import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import './styles/Back.css';

interface Props {
    goToPath: string | null;
}

const Back = ({ goToPath }: Props) => {
    const history = useHistory();

    const handleOnClick = () => {
        if (goToPath !== null) {
            history.push(goToPath);
        } else {
            history.goBack();
        }
    };

    return (
        <div className='back'>
            <button type='button' onClick={handleOnClick}>
                <FontAwesomeIcon icon={faHandPointLeft} />
                <span className='back__text'> go back</span>
            </button>
        </div>
    );
};

export default Back;
