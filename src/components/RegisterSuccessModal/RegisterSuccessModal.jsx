import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterSuccessModal = ({
  isOpen,
  onClose,
  handleLoginClick,
  showButton,
}) => {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      handleCloseClick={onClose}
      showButton={showButton}
    >
      <button
        onClick={handleLoginClick}
        className="modal__register-ok-signin"
        type="button"
      >
        Sign in
      </button>
    </ModalWithForm>
  );
};

export default RegisterSuccessModal;
