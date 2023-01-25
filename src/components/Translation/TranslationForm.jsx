import { useState } from "react"
import { useForm } from "react-hook-form"
import { translationAdd } from "../../api/translation"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../state/UserContext"
import { storageSave } from "../../utils/storage"
import TranslationOutput from "./TranslationOutput"

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
        const output = input
            .trim()
            .split("")
            .map((letter, index) => {
                return <TranslationOutput key={index} letter={letter} />
            })
        console.log("🚀 ~ file: TranslationForm.jsx:39 ~ translate ~ output", output)
        return output
    }

    const onSubmit = async ({ translationText }) => {
        const [error, updatedUser] = await translationAdd(user, translationText)
        if (error !== null) {
            return
        }

        setTranslationOutput([translate(translationText)])
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)
        console.log("🚀 ~ file: TranslationForm.jsx:52 ~ TranslationForm ~ translationOutput", translationOutput)

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
                            pattern="[A-Za-z\s].{}"
                            title="Only letters and spaces"
                            {...register("translationText", translationTextConfig)}
                        />
                        <button type="submit">Translate</button>
                        {errorMessage}
                    </fieldset>
                </form>
            </section>

            <section id="translation-output">
                {translationOutput}
            </section>
        </>
    )
}

export default TranslationForm
