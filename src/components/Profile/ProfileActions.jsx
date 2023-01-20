import { Link } from "react-router-dom";

const ProfileActions = () => {
    return (
        <ul>
            <li>
                <Link to="/translation">Translation</Link>
            </li>
            <li>
                <button>Clear history</button>
            </li>
            <li>
                <button>Logout</button>
            </li>
        </ul>
    );
};

export default ProfileActions;
