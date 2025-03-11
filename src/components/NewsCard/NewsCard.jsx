/*possibly articles or everything*/
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

import "./NewsCard.css";
function NewsCard({
  article,
  onCardSave,
  onCardDelete,
  savedNewsArticles,
  isSavedNews,
  isLoggedIn,
  keyword,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [showToolTip, setShowTooltip] = useState(false);

  //const [isLiked, setIsLiked] = useState(false);
  // instead of alwa6ys being false. This should be true if the article exists inside of the savedNewArticlse array. Otherwise false
  const isLiked = savedNewsArticles.find((savedArticle) => {
    //debugger;
    return savedArticle.url === article.url;
  })
    ? true
    : false;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric", // Example: "2025"
      month: "long", // Example: "March"
      day: "numeric", // Example: "5"
    });
  };

  const newsCardClassName = isLiked
    ? "news-card__save_active"
    : "news-card__save";

  const handleLike = () => {
    onCardSave({ article, isLiked });
  };

  const handleDelete = () => {
    onCardDelete(article);
  };

  return (
    <li className="news-card">
      <div className="news-card__image_container">
        {isSavedNews && article.keyword && (
          <span className="news-card__keyword">{article.keyword}</span>
        )}
        <img
          src={article?.urlToImage}
          alt={article?.source?.name}
          className="news-card__image"
        />
        <div
          className="news-card__btn-container"
          onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {!isLoggedIn && !isSavedNews && showToolTip && (
            <div className="news-card__popup">Sign in to save articles</div>
          )}
          {isSavedNews && showToolTip && (
            <div className="news-card__popup">Remove from saved</div>
          )}
          {isSavedNews ? (
            <button
              className="news-card__saved-trash"
              onClick={handleDelete}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            ></button>
          ) : (
            <button
              className={`news-card__save ${
                isLiked ? "news-card__save_active" : ""
              } ${!isLoggedIn ? "disabled" : ""}`}
              onClick={handleLike}
              disabled={!isLoggedIn}
            ></button>
          )}
        </div>
      </div>
      <div className="news-card__description-container">
        <h3 className="news-card__date">{formatDate(article?.publishedAt)}</h3>
        <h2 className="news-card__name">{article?.title}</h2>
        <p className="news-card__text">{article?.description}</p>
        <p className="news-card__footer">{article?.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
