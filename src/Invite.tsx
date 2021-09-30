import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestionCircle,
    faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import './styles/Invite.css';

interface Props {
    roomId: string;
    isInitiator: boolean;
    hostId: string;
}

const Invite = ({ roomId, isInitiator, hostId }: Props) => {
    const clipboardRef = useRef<HTMLSpanElement>(null);

    // NOTE: this might be overkill, one can just copy that id from props.. but to practise...
    const handleCopyToClipboard = () => {
        if (clipboardRef.current === null) return;
        // Clipboard API
        navigator.clipboard.writeText(clipboardRef.current.innerText).then(
            () => {
                /* clipboard successfully set */
                console.log('Succesfully copied to clipboard.');
            },
            () => {
                /* clipboard write failed */
                console.error('Copying to clipboard failed.');
            }
        );
    };

    return (
        <div className='invite'>
            <span className='invite__label'>Lobby id: </span>
            <span className='invite__room' ref={clipboardRef}>
                {isInitiator ? roomId : hostId}
            </span>
            {isInitiator && (
                <>
                    <span
                        className='invite__icon invite__icon--clipboard'
                        title='Copy id to clipboard'
                        onClick={handleCopyToClipboard}
                    >
                        <FontAwesomeIcon icon={faClipboard} />
                    </span>
                    <span
                        className='invite__icon invite__icon--info'
                        title='Copy this id and send it to your friend to join your lobby.'
                    >
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </span>
                </>
            )}
        </div>
    );
};

export default Invite;
