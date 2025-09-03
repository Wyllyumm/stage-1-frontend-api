import { useState } from "react";

import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import "./Main.css";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";

/*newsArticles*/
function Main({
  searchedNewsArticles,
  bookmarkArticle,
  isSavedNews,
  handleDeleteArticle,
  savedNewsArticles,
  isLoggedIn,
  isLoading,
  isSearching,
  /*handleSearchForm,
  isLoggedIn,
  handleLoginClick,
  handleSignupClick,
  handleUserSignout, */
}) {
  const [visibleCards, setMoreVisibleCards] = useState(3);
  const maxArticles = 100;

  const handleShowMore = () => {
    setMoreVisibleCards(visibleCards + 3);
  };

  return (
    <main>
      <section className="main__news-cards">
        {isSearching ? (
          isLoading ? (
            <Preloader />
          ) : searchedNewsArticles.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="main__results">Search Results</div>
              <ul className="main__news-cards-list">
                {searchedNewsArticles
                  .slice(0, visibleCards)
                  .map((article, id) => (
                    <NewsCard
                      key={article.url}
                      id={article.id}
                      article={article}
                      onCardSave={bookmarkArticle}
                      onCardDelete={handleDeleteArticle}
                      url={article.url}
                      author={article.title}
                      source={article.source.name}
                      isSavedNews={isSavedNews}
                      savedNewsArticles={savedNewsArticles}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
              </ul>
            </>
          )
        ) : null}
      </section>
      {searchedNewsArticles.length > 0 && visibleCards < maxArticles ? (
        <button onClick={handleShowMore} className="main__show-more-btn">
          Show more
        </button>
      ) : null}
      <section className="main__about">
        <About />
      </section>
    </main>
  );
}

export default Main;
