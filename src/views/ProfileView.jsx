import ProfileActions from "../components/Profile/ProfileActions"
import ProfileHeader from "../components/Profile/ProfileHeader"
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory"
import withAuth from "../hoc/withAuth"
import { useUser } from "../state/UserContext"

const ProfileView = () => {
    const { user } = useUser()

    return (
        <>
            <ProfileHeader username={user.username} />
            <section>
                <ProfileTranslationHistory translations={user.translations} />
            </section>
            <section>
                <ProfileActions />
            </section>
        </>
    )
}

export default withAuth(ProfileView)
