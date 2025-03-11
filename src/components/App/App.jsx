import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import "./App.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import { APIkey } from "../../utils/constants";
import { getNews } from "../../utils/NewsApi";
import /*saveArticle, removeSavedArticle, getItems */ "../../utils/Api";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { setToken, getToken, removeToken } from "../../utils/token";
import {
  getItems,
  addCardLike,
  removeCardLike,
  getArticle,
} from "../../utils/Api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [searchedNewsArticles, setSearchedNewsArticles] = useState([]);
  const [savedNewsArticles, setSavedNewsArticles] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation(); //to enable navigation with HashRouter
  const isSavedNews = location.pathname === "/saved-news";
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignupClick = () => {
    setActiveModal("signupModal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSearchForm = (keyword) => {
    if (!keyword.trim()) return; // Prevent empty searches
    setIsSearching(true);
    setSearchKeyWord((prevKeywords) => {
      // Avoid duplicate keywords
      if (prevKeywords.includes(keyword)) return prevKeywords;
      return [keyword, ...prevKeywords]; // Add new keyword while keeping previous ones
    });

    console.log("Updated search keywords:", searchKeyWord); // Debugging log

    setIsLoading(true);

    getNews(keyword)
      .then((articles) => {
        console.log("Fetched articles:", articles);

        // Attach the current keyword to each article
        const updatedArticles = articles.map((article) => ({
          ...article,
          keyword, // Attach the specific keyword used for this search
        }));
        console.log(updatedArticles);
        setSearchedNewsArticles(updatedArticles);
        if (updatedArticles.length === 0) {
          setIsSearching(false);
        }
      })
      .catch((err) => console.error("Error fetching news:", err))
      .finally(() => setIsLoading(false));
  };

  const bookmarkArticle = ({ article, isLiked }) => {
    isLiked
      ? getArticle(article)
          .then((data) => {
            return removeCardLike(data[0]); // 0 index for first property of article, url
          })
          .then(() => {
            setSavedNewsArticles((prev) =>
              prev.filter(
                (savedNewsArticle) => savedNewsArticle.url !== article.url
              )
            );
          })

          .catch((err) => {
            console.error(err);
          })
      : addCardLike(article)
          .then((article) => {
            setSavedNewsArticles([article, ...savedNewsArticles]);
          })
          .catch((err) => console.log(err));
  };

  const handleDeleteArticle = (article) => {
    removeCardLike(article).then(() => {
      setSavedNewsArticles((prev) =>
        prev.filter((savedNewsArticle) => savedNewsArticle.url !== article.url)
      );
    });
  };

  function handleAllFormSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal())

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  const handleSignup = (values) => {
    function makeRequest() {
      return auth.signup(values).then(() => {
        setIsRegistered(true);
        console.log("Signup Success");
        setActiveModal("RegisterSuccessModal");
      });
    }
    handleAllFormSubmit(makeRequest);
  };

  const handleLogin = (values) => {
    function makeRequest() {
      return auth.authorize(values).then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        getFakeUser().then((user) => {
          setCurrentUser(user.data);
        });
      });
    }
    handleAllFormSubmit(makeRequest);
  };

  const getFakeUser = () => {
    const token = getToken;
    if (!token) {
      return;
    }
    return auth.checkToken(token);
  };

  const handleUserSignout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser("");
    navigate("/");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;

    const handleClickToClose = (e) => {
      if (e.target.className === "modal__opened") {
        e.preventDefault();
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickToClose);

    return () => {
      document.removeEventListener("mousedown", handleClickToClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open"); // Add class when a modal is open
    } else {
      document.body.classList.remove("modal-open"); // Remove class when modal closes
    }

    return () => {
      document.body.classList.remove("modal-open"); // Cleanup on unmount
    };
  }, [activeModal]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setSavedNewsArticles(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // to Load saved articles from local storage
    const storedArticles =
      JSON.parse(localStorage.getItem("savedNewsArticles")) || [];

    // Update saved articles state
    setSavedNewsArticles(storedArticles);

    // Extract keywords from saved articles
    const extractedKeywords = [
      ...new Set(storedArticles.map((a) => a.keyword)),
    ];

    // Update `searchKeyWord` state
    setSearchKeyWord(extractedKeywords);
    localStorage.setItem("searchKeyWord", JSON.stringify(extractedKeywords));
  }, []);

  useEffect(() => {
    if (savedNewsArticles.length === 0) {
      setSearchKeyWord([]);
      localStorage.setItem("searchKeyWord", JSON.stringify([]));
    } else {
      const extractedKeywords = [
        ...new Set(savedNewsArticles.map((a) => a.keyword).filter(Boolean)),
      ];

      setSearchKeyWord(extractedKeywords);
      localStorage.setItem("searchKeyWord", JSON.stringify(extractedKeywords));
    }
  }, [savedNewsArticles]);

  const pageContentClassName = isSavedNews
    ? "page__content_save"
    : "page__content";

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className={pageContentClassName}>
          <Header
            handleSearchForm={handleSearchForm}
            isLoggedIn={isLoggedIn}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleSignupClick}
            handleUserSignout={handleUserSignout}
            isSavedNews={isSavedNews}
          />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/"
              element={
                <Main
                  bookmarkArticle={bookmarkArticle}
                  searchedNewsArticles={searchedNewsArticles}
                  isSavedNews={isSavedNews}
                  handleDeleteArticle={handleDeleteArticle}
                  savedNewsArticles={savedNewsArticles}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isSearching={isSearching}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    bookmarkArticle={bookmarkArticle}
                    isLoggedIn={isLoggedIn}
                    handleLoginModal={handleLoginClick}
                    handleSignupModal={handleSignupClick}
                    handleUserSignout={handleUserSignout}
                    isSavedNews={isSavedNews}
                    savedNewsArticles={savedNewsArticles}
                    searchKeyWord={searchKeyWord}
                    handleDeleteArticle={handleDeleteArticle}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        {activeModal === "login" && (
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            handleSignupClick={handleSignupClick}
            isLoading={isLoading}
          />
        )}
        {activeModal === "signupModal" && (
          <SignupModal
            isOpen={activeModal === "signupModal"}
            onClose={closeActiveModal}
            handleSignup={handleSignup}
            handleLoginClick={handleLoginClick}
            isLoading={isLoading}
          />
        )}
        {activeModal === "RegisterSuccessModal" && (
          <RegisterSuccessModal
            isOpen={activeModal === "RegisterSuccessModal"}
            onClose={closeActiveModal}
            handleLoginClick={handleLoginClick}
            showButton={false}
          />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
