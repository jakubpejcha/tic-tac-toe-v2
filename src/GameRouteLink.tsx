import { Link } from 'react-router-dom';

interface Props {
    rootUrl: string;
    prependUrl: boolean;
    path: string;
    title: string;
}

const GameRouteLink = ({ rootUrl, prependUrl, path, title }: Props) => {
    let to = '';

    if (prependUrl) {
        to = `${rootUrl}/${path}`;
    } else {
        to = `/${path}`;
    }

    return (
        <li>
            <Link to={to}>{title}</Link>
        </li>
    );
};

export default GameRouteLink;
