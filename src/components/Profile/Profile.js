import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [editProfileData, setEditProfileData] = useState(false);
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleSaveClick = (e) => {
    e.preventDefault();
    setEditProfileData(false);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditProfileData(true);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    navigate('/');
  };
  
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form 
          className="profile__form" 
          onSubmit={handleSaveClick}>
          <fieldset className="profile__fieldset">
            <div className="profile__input-container">
            <label className="profile__input-label">Имя</label>
              <input
                id="name-input"
                className="profile__input profile__input_name"
                type="name"
                placeholder="Виталий"
                value={name}
                onChange={handleChangeName}
                minLength="2"
                maxLength="30"
                required />
            </div>
            <div className="profile__input-container">
            <label className="profile__input-label">E-mail</label>
              <input
                id="email-input"
                className="profile__input profile__input_email"
                type="email"
                placeholder="pochta@yandex.ru"
                value={email}
                onChange={handleChangeEmail}
                name="email"
                minLength="6"
                maxLength="30"
                required />
            </div>
            <div className="profile__button-container">
              {editProfileData ?
                <button
                  className="profile__button profile__button_submit"
                  type="submit"
                  onClick={handleSaveClick}>
                  Сохранить
                </button>
                :
                <>
                  <button
                    className="profile__button profile__button_edit"
                    type="button" 
                    onClick={handleEditClick}>
                    Редактировать
                  </button>
                  <button
                    className="profile__button profile__button_logout"
                    type="button"
                    onClick={handleLogoutClick}>
                    Выйти из аккаунта
                  </button>
                </>
              }
            </div>
          </fieldset>
        </form>
      </div>
   </section>   
  );
}

export default Profile;