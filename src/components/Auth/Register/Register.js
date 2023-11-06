import React from 'react';
import './Register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../../images/header-logo.svg';

function Register(onSubmit) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <section className="register">
    <Link to="/" className="link">
        <img src={headerLogo} className="register__logo" alt="Логотип" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" name="register">
        <fieldset className="register__fieldset">
          <label className="register__label">Имя</label>
          <input
            type="text"
            id="name-input"
            className="register__input"
            placeholder="Введите ваше имя"
            name="name"
            minLength="2"
            maxLength='30'
            value={name}
            onChange={handleChangeName}
            required />
          <label className="register__label">E-mail</label>
          <input
            id="email-input"
            className="register__input"
            type="email"
            placeholder="Введите email"
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
        <span className="register__error">Что-то пошло не так...</span>
        <button className="register__button" onSubmit={handleSubmit} type="submit">Зарегистрироваться</button>
        <div className="register__confirmation-container">
          <p className="register__confirmation">Уже зарегистрированы?</p>
          <Link className="register__confirmation register__confirmation_link" to='/signin'>Войти</Link>
        </div>
      </form>
    </section>
  );
}

export default Register;