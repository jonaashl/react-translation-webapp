import { useEffect } from "react";
import { userById } from "../api/user";
import ProfileActions from "../components/Profile/ProfileActions";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import withAuth from "../hoc/withAuth";
import { useUser } from "../state/UserContext";
import { storageSave } from "../utils/storage";

const ProfileView = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const findUser = async() => {
            const [ error, latestUser] = await userById(user.id)
            if(error === null) {
                storageSave(STORAGE_KEY_USER, latestUser)
                setUser(latestUser)
            }
        }

    },[ setUser, user.id ])

    return (
        <>
            <ProfileHeader username={user.username} />
            <ProfileTranslationHistory translations={user.translations} />
            <ProfileActions />
        </>
    )
};

export default withAuth(ProfileView);
