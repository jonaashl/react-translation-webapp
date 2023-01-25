import { useForm } from "react-hook-form";

const translationTextConfig = {
    required: true,
    maxLength: 40,
}



const TranslationForm = ({ onTranslation }) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const errorMessage = (() => {
        if (!errors.translationText) {
            return null;
        }
        if (errors.translationText.type === "required") {
            return <span>Minimum 1 character needed</span>;
        }

        if (errors.translationText && errors.translationText.type === "maxLength") {
            return <span>Max length reached (max 40)</span>;
        }
})();


    const onSubmit = ({ translationText }) => { onTranslation(translationText) };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="translation-text">Translation text:</label>
                <input type="text"
                placeholder="Hello World"
                maxLength={40}
                {...register("translationText", translationTextConfig)}
                />
                { errorMessage }
            </fieldset>

            <button type="submit">Translate</button>
        </form>
    );
};

export default TranslationForm;
