import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import "./Navigation.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import signOutBtn from "../../assets/header-signout.svg";
import signOutBtnSaved from "../../assets/header-signout-saved.svg";

function Navigation({
  handleLoginModal,
  isLoggedIn,
  isSavedNews,
  handleUserSignout,
}) {
  // State for mobile menu and window resizing
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false); // Tracks if dropdown is open
  const { currentUser } = useContext(CurrentUserContext);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Dynamic class names
  const homeBtnClassName = isSavedNews
    ? "navigation__home navigation__home--saved"
    : "navigation__home";
  const savedBtnClassName = isSavedNews
    ? " navigation__saved-articles navigation__saved-articles--saved"
    : "navigation__saved-articles";
  const signoutImgSrcName = isSavedNews ? signOutBtnSaved : signOutBtn;
  const signoutBtnClassName = isSavedNews
    ? "navigation__signout navigation__signout--saved"
    : "navigation__signout";

  const dropdownBtnClassName = isSavedNews
    ? "navigation__dropdown-button navigation__dropdown-button--saved"
    : "navigation__dropdown-button";

  return (
    <div className="navigation">
      <div
        className={`navigation__overlay ${menuOpen ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>
      {isMobile ? (
        <>
          {/* Mobile Menu Button */}
          <button
            className={dropdownBtnClassName}
            onClick={toggleMenu}
          ></button>

          {/* Fullscreen Dropdown Menu */}
          <div
            className={`navigation__dropdown-menu ${menuOpen ? "open" : ""}`}
          >
            {/* Close button */}
            <button
              className="navigation__close-button"
              onClick={toggleMenu}
            ></button>

            {/* Navigation Links */}
            <Link
              to="/"
              className="navigation-dropdown__link navigation-dropdown__link--home"
              onClick={toggleMenu}
            >
              <div className="navigation__home-mobile">Home</div>
            </Link>

            {isLoggedIn && (
              <Link
                to="/saved-news"
                className="navigation-dropdown__link navigation-dropdown__link--saved-articles"
                onClick={toggleMenu}
              >
                <div className="navigation__saved-articles-mobile">
                  Saved Articles
                </div>
              </Link>
            )}

            {/* Sign In / Sign Out */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleUserSignout();
                  toggleMenu();
                }}
                className="navigation__signin-out-mobile"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLoginModal();
                  toggleMenu();
                }}
                className="navigation__signin-out-mobile"
              >
                Sign In
              </button>
            )}
          </div>
        </>
      ) : (
        // Desktop View
        <div className="navigation__btns">
          <Link to="/" className="navigation__link">
            <div className={homeBtnClassName}>Home</div>
          </Link>

          {isLoggedIn && (
            <Link to="/saved-news" className="navigation__link">
              <div className={savedBtnClassName}>Saved Articles</div>
            </Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleUserSignout} className={signoutBtnClassName}>
              <div className="navigation__signout-container">
                <p className="navigation__user-name">{currentUser?.name}</p>
                <img
                  src={signoutImgSrcName}
                  className="navigation__signout-image"
                  alt="Sign Out"
                />
              </div>
            </button>
          ) : (
            <button onClick={handleLoginModal} className="navigation__signin">
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navigation;
