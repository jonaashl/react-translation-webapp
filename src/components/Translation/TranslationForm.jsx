import { useForm } from "react-hook-form";

const TranslationForm = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => {

    }

    return (

        <form onSubmit={ handleSubmit(onSubmit) }>
            <fieldset>
                <label htmlFor="translation-text">Translation text:</label>
                <input type="text" {...register("translationText")} />
            </fieldset>

            <button type="submit">Translate</button>
        </form>
    )
}

export default TranslationForm;