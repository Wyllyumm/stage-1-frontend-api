import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  buttonClass,
  showButton = true,
}) {
  /* const submitButtonClassName = `modalsubmit ${
    novalidate ? "modal__submit" : ""
  }`; */

  /*const submitButtonClassName = novalidate
    ? "modal__submit modal__submit_profile"
    : "modal__submit modal__submit_profile_active"; */

  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {showButton && (
            <button type="submit" className={buttonClass}>
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
