import React from 'react';
import './Register.css';
import { Navigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import useFormValidation from '../../../hooks/useFormValidation';

function Register({ isFormSaved, onRegister, loggedIn }) {
  const { values, errors, isFormValid, onChange } = useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="register">
       <AuthPage
        title="Добро пожаловать!"
        name="register"
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={"Зарегистрироваться"}
      >
        <label className="form__input-label">
          Имя
          <input
            id="name-input"
            className={`form__input ${errors.name && 
              "form__input_incorrect"}`}
            placeholder="Введите ваше имя"
            type="text"
            name="name"
            form="register"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            pattern={"^[A-Za-zА-Яа-яЁё\\-\\s]+$"}
            disabled={isFormSaved}
            onChange={onChange}
            required
          />
          <span
            className={`form__input-error ${errors.name ? 
              "form__input-error_active" : ""}`}
          >
            {errors.name || ''}
          </span>
        </label>
        <label className="form__input-label">
          E-mail
          <input
            id="email-input"
            className={`form__input ${errors.email ? 
              "form__input_incorrect" : ''}`}
            type="text"
            name="email"
            placeholder="Введите email"
            form="register"
            value={values.email || ''}
            disabled={isFormSaved}
            onChange={onChange}
            required
          />
          <span
            className={`form__input-error ${errors.email ? 
              "form__input-error_active" : ''}`}
          >
            {errors.email || ''}
          </span>
        </label>
        <label className="form__input-label">
          Пароль
          <input
            id="password-input"
            className={`form__input ${errors.password ? 
              "form__input_incorrect" : ''}`}
            type="password"
            name="password"
            form="register"
            autoComplete="off"
            placeholder="Введите пароль"
            minLength="6"
            value={values.password || ""}
            disabled={isFormSaved}
            onChange={onChange}
            required
          />
          <span
            className={`form__input-error ${
              errors.password ? "form__input-error_active" : ""
            }`}
          >
            {errors.password || ""}
          </span>
        </label>
        <button
          className={`form__button-submit form__button-submit_type_register ${
            (!isFormValid || isFormSaved) && "form__button-submit_disabled"
          }`}
          type="submit"
          isFormValid={isFormValid}
          isFormSaved={isFormSaved}
        >
          {isFormSaved ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </AuthPage>
    </main>
  );
}

export default Register;