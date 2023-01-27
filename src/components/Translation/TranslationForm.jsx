import { useState } from "react"
import { useForm } from "react-hook-form"
import { translationAdd } from "../../api/translation"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../state/UserContext"
import { storageSave } from "../../utils/storage"
import "../../styles/TranslationForm.css"
// import TranslationOutput from "./TranslationOutput"

const translationTextConfig = {
    required: true,
}

const TranslationForm = () => {
    const { user, setUser } = useUser()
    const [translationOutput, setTranslationOutput] = useState([])

    const { register, handleSubmit } = useForm()

    const translate = input => {
        return input
            .trim()
            .split("")
            .map((letter, index) => {
                return <img key={index} src={`img/${letter}.png`} alt={letter} width="70" />
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
                        <label htmlFor="translation-form">Input text to translate</label>
                        <div className="input-button">
                            <input
                                type="text"
                                placeholder="Hello World"
                                maxLength={40}
                                pattern="[A-Za-z\s]+"
                                title="Only letters (a-z) and spaces"
                                {...register("translationText", translationTextConfig)}
                            />
                            <button type="submit">Translate</button>
                        </div>
                    </fieldset>
                </form>
            </section>

            <section id="translation-output">{translationOutput}</section>
        </>
    )
}

export default TranslationForm
