import React, { useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import { initialMovies } from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Гульнара",
    email: "111@111.ru",
    isLoggedIn: false
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === '/' ? setIsLoggedIn(false) : setIsLoggedIn(true)
  })

  const handleRegister = (name, email, password) => {
    navigate("/sign-in");
  };

  const handleLogin = (email, password) => {
    setIsLoggedIn(true);
    navigate('/', { replace: true });
  };

  const handleUpdateUser = (newData) => {
    setCurrentUser(newData);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        loggedIn={isLoggedIn} />
        <Routes>
          <Route 
            path="/" 
            element={<Main />}/>
          <Route 
            path="/movies" 
            element={
              <Movies 
                movies={initialMovies} />}/>
          <Route 
            path="/saved-movies" 
            element={
              <SavedMovies/>}/>
          <Route 
            path="/profile" 
            element={
              <Profile 
                setCurrentUser={setCurrentUser}
                onSave={handleUpdateUser} 
                onLogout={handleLogout}/>} />
          <Route 
            path="/signup" 
            element={
              <Register 
                onSubmit={handleRegister} />}/>
          <Route 
            path="/signin" 
            element={
              <Login
                onSubmit={handleLogin} />} />
          <Route 
            path="*" 
            element={<ErrorNotFound/>} />
        </Routes>
        <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;