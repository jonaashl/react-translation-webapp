import { translationAdd } from "../api/translation";
import TranslationForm from "../components/Translation/TranslationForm";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import withAuth from "../hoc/withAuth";
import { useUser } from "../state/UserContext";
import { storageSave } from "../utils/storage";

const TranslationView = () => {

    const { user, setUser } = useUser()

    const handleTranslationClick = async (text) => {
        // oversette text
        const translation = text.trim()
        const [error, updatedUser] = await translationAdd(user, translation)
        if (error !== null) {
            return
        }
        
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)

        console.log("Error", error)
        console.log("UpdatedUser", updatedUser)
    }

    return (
        <>
            <h1>Translation Page</h1>
            <section id="translation-text">
                <TranslationForm onTranslation = { handleTranslationClick }/>
            </section>
        </>
    );
};

export default withAuth(TranslationView);
