import { translationClearHistory } from "../../api/translation";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../state/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";

const ProfileActions = () => {
    const { user, setUser } = useUser();

    const handleLogoutClick = () => {
        if (window.confirm("Are you sure?")) {
            storageDelete(STORAGE_KEY_USER);
            setUser(null);
        }
    };

    const handleClearHistoryClick = async () => {
        if (!window.confirm("Are you sure?\nThis can not be undone!")) {
            return
        }

        const [ clearError ] = await translationClearHistory(user.id)
        if (clearError !== null) {
            return
        }

        const updatedUser = {
            ...user,
            translations: []
        }

        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)
    }

    return (
        <ul>
            <li>
                <button onClick={ handleClearHistoryClick }>Clear history</button>
            </li>
            <li>
                <button onClick={handleLogoutClick}>Logout</button>
            </li>
        </ul>
    );
};

export default ProfileActions;
