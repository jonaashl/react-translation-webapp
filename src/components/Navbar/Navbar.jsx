import { NavLink } from "react-router-dom";
import { useUser } from "../../state/UserContext";

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav>
            <h3>Global navigation</h3>

            {user !== null && (
                <ul>
                    <li>
                        <NavLink to="/translation">Translation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
