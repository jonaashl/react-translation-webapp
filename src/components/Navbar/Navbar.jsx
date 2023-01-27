import { NavLink } from "react-router-dom"
import { useUser } from "../../state/UserContext"
import "../../styles/Navbar.css"

const Navbar = () => {
    const { user } = useUser()

    return (
        <>
            <nav className="nav">
                <h3 id="nav-h3">Lost in translation</h3>
                <img src="img/assignmentReact.png" alt="reactHydra" />
                {user !== null && (
                    <ul id="nav-ul">
                        <li className="nav-buttons">
                            <NavLink to="/translation">Translation</NavLink>
                        </li>
                        <li className="nav-buttons">
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    )
}

export default Navbar
