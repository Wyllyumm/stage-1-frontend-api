import { Link } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="not-found">
      <Link to="/">
        <h3 className="not-found__title">
          <span>404</span> - Page Not Found!
        </h3>
      </Link>

      <p className="not-found__text">
        Uh oh! There&apos;s nothing here... Sorry. 🥺
      </p>
    </div>
  );
}

export default PageNotFound;
