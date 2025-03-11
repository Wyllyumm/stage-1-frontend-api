import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Header({
  handleSearchForm,
  handleLoginClick,
  handleSignupClick,
  isLoggedIn,
  handleUserSignout,
  isSavedNews,
}) {
  const headerClassName = isSavedNews ? "header__saved" : "header";
  const headerLogoClassName = isSavedNews
    ? "header__logo_saved"
    : "header__logo";
  /*const { currentUser } = useContext(CurrentUserContext); */
  return (
    <header className={headerClassName}>
      <div className="header__all">
        <Link to="/" className="navigation__link">
          <p className={headerLogoClassName}>NewsExplorer</p>
        </Link>
        <div className="header__navigation">
          <Navigation
            handleLoginModal={handleLoginClick}
            handleSignupModal={handleSignupClick}
            isLoggedIn={isLoggedIn}
            handleUserSignout={handleUserSignout}
            isSavedNews={isSavedNews}
          />
        </div>
      </div>
      <span className="header__seperator"></span>
      {isSavedNews ? null : <SearchForm handleSearchForm={handleSearchForm} />}
    </header>
  );
}

export default Header;
