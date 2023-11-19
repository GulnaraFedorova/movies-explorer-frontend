import React from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';
import useFormValidation from '../../../hooks/useFormValidation';
import AuthPage from '../AuthPage/AuthPage';


function Login({isFormSaved, handleLogin, loggedIn }) {
  const { values, errors, isFormValid, onChange } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="login">
     <AuthPage
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={"Войти"}
      >
        <label className="form__input-label">
          E-mail
          <input
            id="email-input"
            className={`form__input ${errors.email ? 
              "form__input_incorrect" : ''}`}
            type="text"
            placeholder="Введите ваш email"
            name="email"
            form="login"
            value={values.email || ''}
            autoComplete="off"
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
            placeholder="Введите пароль"
            name="password"
            minLength="6"
            maxLength="18"
            form="login"
            value={values.password || ''}
            disabled={isFormSaved}
            onChange={onChange}
            required
          />
          <span
            className={`form__input-error ${errors.password ? 
              "form__input-error_active" : ''}`}
          >
            {errors.password || ''}
          </span>
        </label>
        <button
          className={`form__button-submit form__button-submit_type_login ${
            (!isFormValid || isFormSaved) && "form__button-submit_disabled" 
          }`}
          type="submit"
          isFormValid={isFormValid}
          isFormSaved={isFormSaved}
        >
          {isFormSaved ? "Вход..." : "Войти"}
        </button>
      </AuthPage>
    </main>
  );
}

export default Login;