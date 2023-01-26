import { useState } from "react"
import { useForm } from "react-hook-form"
import { translationAdd } from "../../api/translation"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../state/UserContext"
import { storageSave } from "../../utils/storage"
// import TranslationOutput from "./TranslationOutput"

const translationTextConfig = {
    required: true,
}

const TranslationForm = () => {
    const { user, setUser } = useUser()
    const [translationOutput, setTranslationOutput] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const errorMessage = (() => {
        if (!errors.translationText) {
            return null
        }
        if (errors.translationText.type === "required") {
            return <span>No text submitted</span>
        }
    })()

    const translate = input => {
        return input
            .trim()
            .split("")
            .map((letter) => {
                return <img src={`img/${letter}.png`} alt={letter} width="70" />
            })
    }

    const onSubmit = async ({ translationText }) => {
        const [error, updatedUser] = await translationAdd(user, translationText)
        if (error !== null) {
            return
        }

        setTranslationOutput(translate(translationText))
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)

        console.log("Error", error)
        console.log("UpdatedUser", updatedUser)
    }

    return (
        <>
            <section id="translation-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor="translation-text">Translation text:</label>
                        <input
                            type="text"
                            placeholder="Hello World"
                            maxLength={40}
                            pattern="[A-Za-z\s]+"
                            title="Only letters (a-z) and spaces"
                            {...register("translationText", translationTextConfig)}
                        />
                        <button type="submit">Translate</button>
                        {errorMessage}
                    </fieldset>
                </form>
            </section>

            <section id="translation-output">{translationOutput}</section>
        </>
    )
}

export default TranslationForm
