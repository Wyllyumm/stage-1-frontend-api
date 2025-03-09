import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader__circle-wrapper">
      <div className="preloader__circlecontainer">
        <div className="preloader__circle"></div>
        <p className="preloader__circle-noti">Searching for news...</p>
      </div>
    </div>
  );
}

export default Preloader;
