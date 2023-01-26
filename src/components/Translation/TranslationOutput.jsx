const TranslationOutput = letter => {
    const imagePath = `img/${letter}.png`

    return (
        <aside>
            {/* <img src={imagePath} alt={letter} width="25" /> */}
            {letter + letter}
        </aside>
    )
}

export default TranslationOutput
