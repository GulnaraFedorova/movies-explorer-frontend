import React from "react";
import { Link } from "react-router-dom";
import "./AuthPage.css";
import headerLogo from '../../../images/header-logo.svg';
import AuthForm from '../AuthForm';

function AuthPage({
  title,
  name,
  onSubmit,
  isFormValid,
  buttonText,
  ...props
}) {
  return (
    <section className="auth-layout">
      <Link to="/">
        <img src={headerLogo} className="auth-layout__logo" alt="Логотип" />
      </Link>
      <h1 className="auth-title">{title}</h1>
      <AuthForm
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </AuthForm>
      {name === "register" ? (
        <p className="auth-layout__paragraph">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-layout__link link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-layout__paragraph">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth-layout__link link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthPage;