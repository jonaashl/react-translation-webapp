import TranslationForm from "../components/Translation/TranslationForm";
import withAuth from "../hoc/withAuth";

const TranslationView = () => {
    return (
        <>
            <h1>Translation</h1>
            <section id="translation-text">
                <TranslationForm />
            </section>
        </>
    );
};

export default withAuth(TranslationView);
