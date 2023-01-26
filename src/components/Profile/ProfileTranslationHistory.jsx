import ProfileTranslationHistoryItem from "./ProfileTranslationHistoryItem";
import "../../styles/ProfileTranslationHistory.css"


const ProfileTranslationHistory = ({ translations }) => {
    const translationList = translations.map((translation, index) => (
        <ProfileTranslationHistoryItem key={index + "-" + translation} translation={translation} />
    ));

    return (
        <section>
            <h4 className="historyHeader">Your translation history</h4>

            { translationList.length === 0 && <p>You have no translations yet</p>}

            <ul>{translationList.slice(-10).reverse()}</ul>
        </section>
    );
};

export default ProfileTranslationHistory;
