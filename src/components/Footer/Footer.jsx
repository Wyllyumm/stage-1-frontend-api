import { Link } from "react-router-dom";

import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import facebookIcon from "../../assets/facebook.svg";

function Footer({}) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2024 Supersite, Powered by News API
      </p>

      <div className="footer__home">
        <Link to="/" className="footer__home-btn footer__link">
          Home
        </Link>

        <a
          href="https://tripleten.com"
          targer="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <p className="footer__tripleten">TripleTen</p>
        </a>
      </div>
      <div className="footer__socials">
        <a
          href="https://github.com/Wyllyumm"
          targer="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={githubIcon} className="footer__icon" alt="Github logo" />
        </a>
        <a
          href="https://www.facebook.com/tripleten.tech"
          targer="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img
            src={facebookIcon}
            className="footer__icon"
            alt="Facebook logo"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
