import React, { useEffect, useContext, useState } from 'react';
import './Profile.css';
import useFormValidation from '../../hooks/useFormValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthForm from '../AuthForm/AuthForm';

function Profile({ isFormSaved, onUpdateUser, signtOut }) {

  const currentUser = useContext(CurrentUserContext);
  const [isDataChanged, setIsDataChanged] = useState(true);
  const [isModifying, setModifying] = useState(false);
  const { values, errors, isFormValid, onChange, resetValidation } =
    useFormValidation();

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setIsDataChanged(false)
      : setIsDataChanged(true);
  }, [currentUser, values]);

  useEffect(() => {
    resetValidation(false, currentUser);
  }, [resetValidation, currentUser]);

  function handleEditClick() {
    setModifying(!isModifying);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name || ""}!`}</h1>
        <AuthForm
          name="profile" 
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isDataChanged={isDataChanged}
          isModifying={isModifying}
        >
          <label className="form__input-label form__input-label_type_profile">
            Имя
            <input
              id="name-input"
              className={`form__input form__input_type_profile ${
                errors.name ? "form__input_incorrect" : ""
              }`}
              type="text"
              name="name"
              form="profile"
              required
              autoComplete="off"
              minLength="2"
              maxLength="30"
              pattern={"^[A-Za-zА-Яа-яЁё\\-\\s]+$"}
              readOnly={!isModifying && true}
              onChange={onChange}
              value={values.name || ""}
            />
          </label>
          <label className="form__input-label form__input-label_type_profile">
            E-mail
            <input
              className={`form__input form__input_type_profile ${
                errors.email ? "form__input_incorrect" : ""
              }`}
              type="text"
              name="email"
              form="profile"
              required
              id="email-input"
              readOnly={!isModifying && true}
              onChange={onChange}
              value={values.email || ""}
            />
          </label>
          <div
            className={`form__errors-container ${
              errors.name || errors.email ? "form__errors-container_active" : ""
            }`}
          >
            <div className="form__error-container">
              <p
                className={`form__error-name ${
                  errors.name ? "form__error-name_active" : ""
                }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error form__input-error_type_profile ${
                  errors.name ? "form__input-error_active" : ""
                }`}
              >
                {errors.name || ""}
              </span>
            </div>
            <div className="form__error-container">
              <p
                className={`form__error-name ${
                  errors.email ? "form__error-name_active" : ""
                }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error form__input-error_type_profile ${
                  errors.email ? "form__input-error_active" : ""
                }`}
              >
                {errors.email || ""}
              </span>
            </div>
          </div>
          <button
          className={`form__button-submit form__button-submit_type_profile ${
            !isModifying
            ? "form__button-submit_hidden"
            : 
            (!isFormValid || isFormSaved || isDataChanged) && 
            "form__button-submit_disabled"}`}
          type="submit"
          isFormValid={isFormValid}
          isFormSaved={isFormSaved}
        >
          {isFormSaved ? "Сохранение..." : "Сохранить"}
        </button>
        </AuthForm>
        <div
          className={`profile__edit ${
            isModifying ? "profile__edit_hidden" : ""
          }`}
        >
          <button
            className="profile__button profile__button_submit"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_logout"
            type="button"
            onClick={signtOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;