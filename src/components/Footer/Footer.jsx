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
        <Link to="/" className="navigation__link">
          <p className="footer__home-btn">Home</p>
        </Link>
        <p className="footer__tripleten">TripleTen</p>
      </div>
      <div className="footer__socials">
        <img src={githubIcon} className="footer__icon_github" />
        <img src={facebookIcon} className="footer__icon_fb" />
      </div>
    </footer>
  );
}

export default Footer;
