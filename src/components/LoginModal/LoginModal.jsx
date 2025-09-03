import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  onClose,
  isOpen,
  handleLogin,
  handleSignupClick,
  isLoading,
}) => {
  /* const [data, setData] = useState({ email: "", password: "" }); */
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const loginSubmitBtnClassName = buttonIsActive
    ? "modal__submit modal__submit--siginup-login modal__submit--active"
    : "modal__submit modal__submit--siginup-login";

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function resetUserForm() {
    setPassword("");
    setEmail("");
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password }, resetUserForm);
  };

  useEffect(() => {
    if (email && password) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [email, password]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging In..." : "Log In"}
      /* activeModal={activeModal} convert to universal */
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleUserSubmit}
      buttonClass={loginSubmitBtnClassName}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <button
        onClick={handleSignupClick}
        className="modal__or-btn"
        type="button"
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
