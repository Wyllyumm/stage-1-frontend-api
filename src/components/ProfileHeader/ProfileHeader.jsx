import { useContext } from "react";

import "./ProfileHeader.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ProfileHeader({ savedNewsArticles, searchKeyWord }) {
  const articleNumber = savedNewsArticles.length;
  const { currentUser } = useContext(CurrentUserContext);
  const formatKeywords = (keywords) => {
    console.log(keywords);
    if (keywords.length === 0) return ""; // No keywords

    if (keywords.length === 1) return keywords[0]; // Single keyword

    if (keywords.length === 2) return keywords.join(" and "); // Two keywords

    // More than 2 keywords: show first two + count remaining
    return `${keywords.slice(0, 2).join(", ")} and ${
      keywords.length - 2
    } other${keywords.length - 2 > 1 ? "s" : ""}`;
  };

  return (
    <div className="profile-header">
      <div className="profile-header__container">
        <h2 className="profile-header_saved-articles">Saved articles</h2>
        <h1 className="profile-header__personal">
          {currentUser?.name}, you have {articleNumber} saved {""} articles
        </h1>
        <h2 className="profile-header__keywords">
          By keywords:{" "}
          <span className="profile-header__span-keywords">
            {formatKeywords(searchKeyWord)}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default ProfileHeader;
