import React from 'react';
import './Navigation.css';
import { NavLink } from "react-router-dom";
import profileLogo from "../../images/profile-logo.svg";
function Navigation({ isNavigationOpen }) {

  return (
    <nav className={`navigation ${isNavigationOpen && "navigation_opened"}`}>
      <ul className={`navigation__list ${isNavigationOpen && "navigation__list_opened"}`}>
        <li className="navigation__sidebar">
          <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? `navigation__link navigation__link_active` : `navigation__link` 
              }>
                Главная
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => isActive ? `navigation__link navigation__link_active` : `navigation__link` 
            }>
              Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies" 
            className={({ isActive }) => isActive ? `navigation__link navigation__link_active` : `navigation__link` 
            }>
              Сохранённые фильмы
          </NavLink>
        </li>
        <li className='navigation__link_container'>
          <NavLink 
            to="/profile" 
            className="navigation__link navigation__link_profile"
            >
              Аккаунт
            <img className='navigation__link_img' src={profileLogo} alt="Лого"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;