import './Header.css';
import headerLogo from "../../images/header-logo.svg";
import React, { useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isNavigationOpen, setNavigationOpen] = useState(false);

  const location = useLocation();

  const onClickBurger = () => {
    setNavigationOpen(!isNavigationOpen);
  };

  return location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile' ? (
    <header className={`header ${!loggedIn ? 'header_color_blue' : ''}`}>
      <Link to='/' className="header__link">
        <img src={headerLogo} className="header__logo" alt="Логотип" />
      </Link>
      {loggedIn
        ? <>
          <Navigation isNavigationOpen={isNavigationOpen} />
          <button className={`header__menu ${isNavigationOpen && "header__menu_opened"}`}
                    onClick={onClickBurger}/>
        </>
        : <ul className="header__authorized">
            <li>
              <NavLink className="header__link header__link_register" to="/signup">Регистрация</NavLink>
            </li>
            <li>
              <NavLink className="header__link header__link_login" to="/signin">Войти</NavLink>
          </li>
        </ul>
      }
    </header>
  )
  :
  (<></>);
}

export default Header;