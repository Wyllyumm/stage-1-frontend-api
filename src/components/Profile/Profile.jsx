import SavedArticles from "../SavedArticles/SavedArticles";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

import "./Profile.css";
function Profile({
  bookmarkArticle,
  savedNewsArticles,
  searchKeyWord,
  isSavedNews,
  handleDeleteArticle,
  isLoggedin,
}) {
  return (
    <div className="profile">
      <div className="profile__header">
        <section className="profile__personal-header">
          <ProfileHeader
            savedNewsArticles={savedNewsArticles}
            searchKeyWord={searchKeyWord}
          />
        </section>
      </div>
      <div className="profile__cards-section">
        <section className="profile__articles">
          <SavedArticles
            bookmarkArticle={bookmarkArticle}
            savedNewsArticles={savedNewsArticles}
            isSavedNews={isSavedNews}
            handleDeleteArticle={handleDeleteArticle}
            isLoggedin={isLoggedin}
          />
        </section>
      </div>
    </div>
  );
}

export default Profile;
