import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import NewsCard from "../NewsCard/NewsCard";

import "./SavedArticles.css";
function SavedArticles({
  savedNewsArticles,
  bookmarkArticle,

  isSavedNews,
  handleDeleteArticle,
  isLoggedin,
}) {
  const savedItems = savedNewsArticles;

  return !savedNewsArticles || savedNewsArticles.length === 0 ? (
    <p className="saved-articles__empty"> No Saved Articles</p>
  ) : (
    <ul className="saved-articles__list">
      {savedItems.map((article) => {
        return (
          <NewsCard
            key={article?.url}
            id={article?.id}
            article={article}
            onCardSave={bookmarkArticle}
            urlToImage={article?.urlToImage}
            author={article?.title}
            source={article?.source?.name}
            isSavedNews={isSavedNews}
            onCardDelete={handleDeleteArticle}
            savedNewsArticles={savedNewsArticles}
            isLoggedin={isLoggedin}
            keyword={article?.keyword}
          />
        );
      })}
    </ul>
  );
}

export default SavedArticles;
