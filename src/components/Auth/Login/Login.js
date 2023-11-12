import React from 'react';
import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../../images/header-logo.svg';


function Login(onSubmit) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <section className="register">
    <Link to="/" className="link">
        <img src={headerLogo} className="register__logo" alt="Логотип" />
      </Link>
      <h1 className="register__title">Рады видеть!</h1>
      <form className="register__form" name="login">
        <fieldset className="register__fieldset">
          <label className="register__label">E-mail</label>
          <input
            id="email-input"
            className="register__input"
            type="email"
            placeholder="Введите ваш email"
            name="email"
            minLength="6"
            maxLength="30"
            value={email}
            onChange={handleChangeEmail}
            required />
          <label className="register__label">Пароль</label>
          <input
            id="password-input"
            className="register__input"
            type="password"
            placeholder="Введите пароль"
            name="password"
            minLength="6"
            maxLength="18"
            value={password}
            onChange={handleChangePassword}
            required />
        </fieldset>
        <span className="register__error register__error_login">Что-то пошло не так...</span>
        <button className="register__button" onSubmit={handleSubmit} type="submit">Войти</button>
        <div className="register__confirmation-container">
          <p className="register__confirmation">Ещё не зарегистрированы?</p>
          <Link className="register__confirmation register__confirmation_link" to='/signup'>Регистрация</Link>
        </div>
      </form>
    </section>
  );
}

export default Login;