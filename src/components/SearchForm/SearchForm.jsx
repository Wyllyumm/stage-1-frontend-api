import { useState, useEffect } from "react";

import "./SearchForm.css";

function SearchForm({ handleSearchForm }) {
  const [error, setError] = useState("");
  const [keyword, setKeyWord] = useState("");
  const handleSearchFieldChange = (e) => {
    console.log(e);
    setKeyWord(e.target.value);
  };

  const [buttonIsActive, setButtonIsActive] = useState(false);

  const searchBtnSubmitClassName = buttonIsActive
    ? "search__button search__button--active"
    : "search__button";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!keyword) {
      setError("Please enter keyword");
      console.error("Search field empty");
    }
    handleSearchForm(keyword);
  };

  useEffect(() => {
    if (keyword) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [keyword]);

  return (
    <div className="search__container">
      <h1 className="search__title">What's going on in the world?</h1>
      <h2 className="search__description">
        Find the latest news on any topic and save them in your personal
        account.
      </h2>
      <div className="search__input-container">
        <label htmlFor="news" className="search__label">
          <input
            type="text"
            className="search__input"
            id="news"
            onChange={handleSearchFieldChange}
            value={keyword}
            placeholder="Enter topic"
            required
          />
        </label>
        <button
          type="submit"
          onClick={handleSearchSubmit}
          className={searchBtnSubmitClassName}
        >
          &nbsp;Search
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
