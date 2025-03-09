import cantFind from "../../assets/article-null.svg";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notFound__img-container">
      <img
        className="notFound__img"
        src={cantFind}
        alt="sad magnifying glass"
      />
      <h3 className="notFound__title">Nothing Found</h3>
      <p className="notFound__description">
        Sorry, but nothing matched your search terms
      </p>
    </div>
  );
}

export default NotFound;
