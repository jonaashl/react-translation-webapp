import { translationAdd } from "../api/translation";
import TranslationForm from "../components/Translation/TranslationForm";
import withAuth from "../hoc/withAuth";
import { useUser } from "../state/UserContext";

const TranslationView = () => {

    const { user } = useUser()

    const handleTranslationClick = async (text) => {
        // oversette text
        console.log(text)
        const translation = text.trim()
        console.log(translation);
        const [error, result] = await translationAdd(user, translation)
        console.log("Error", error)
        console.log("Result", result)
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
