import React, { useState, useEffect, useContext} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../AuthForm/Register/Register';
import Login from '../AuthForm/Login/Login';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import InfoTooltip from '../InfoToolTip/InfoToolTip'
import { MoviesContext } from '../../contexts/MoviesContext';
import { MOVIES_API_URL} from '../../utils/constants';
import debounce from 'lodash.debounce';
 
function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: ''});
  const [loggedIn, setLoggedIn] = useState(null);
  const [isPreloading, setPreloading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [infoTooltip, setInfoTooltip] = useState({
    message: '',
    isOpen: false,
    success: false,
  });

  const {
    movies,
    setMovies,
    setMoviesIsSearched,
    filterMovies,
    filterSavedMovies,
    setSavedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    restoreState,
  } = useContext(MoviesContext);

  const moviesState = localStorage.getItem('moviesState');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function chekToken()  {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .tokenValidation(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setCurrentUser((prev) => ({...prev, name: data.name, email: data.email}))
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setPreloading(false))
        } else {
          setPreloading(false)
        }
  }

  useEffect(() => {
    chekToken();
  }, []);

  function handleClosePopup() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
  }

  const handleRegister = (email, password, name) => {
    setIsFormSaved(true)
    mainApi
      .userRegistration(email, password, name)
      .then(() => {
        handleLogin({email, password});
        setLoggedIn(true);
        setInfoTooltip({
          message: "Вы успешно зарегистрировались!",
          isOpen: true,
          success: true,
        });
        navigate("/signin", { replace: true });
      })
    .catch((err) => {
      if (err.statusCode === 409) {
        setInfoTooltip({
          message: 'Пользователь с указанным email уже существует',
          isOpen: true,
          success: false,
        })
        return false;
      }
      if (err.statusCode === 400) {
        setInfoTooltip({
          message: 'При авторизации пользователя произошла ошибка',
          isOpen: true,
          success: false,
        })
        return false;
      }
      if (err.statusCode === 500) {
        setInfoTooltip({
          message: `На сервере произошла ошибка`,
          isOpen: true,
          success: false,
        })
        return false;
      }
    })
    .finally(() => setIsFormSaved(false))
  }

  const handleLogin = (email, password) => {
    setIsFormSaved(true)
    mainApi
      .userAuthorization(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser((prev) => ({...prev, name: data.name, email: data.email}));
        setLoggedIn(true);
        setInfoTooltip({
          message: 'Успешный вход',
          isOpen: true,
          success: true,
        });
        navigate('/movies', {replace: true});
    })
    .catch((err) => {
      setIsFormSaved(true)
      if (err.statusCode === 401) {
        setInfoTooltip({
          message: 'Введен неправильный логин или пароль',
          isOpen: true,
          success: false,
        })
        return false;
      }
      if (err.statusCode === 400) {
        setInfoTooltip({
          message: 'При авторизации пользователя произошла ошибка',
          isOpen: true,
          success: false,
        })
        return false;
      }
      if (err.statusCode === 500) {
        setInfoTooltip({
          message: `На сервере произошла ошибка`,
          isOpen: true,
          success: false,
        })
        return false;
      }
    })
    .finally(() => setIsFormSaved(false))
  };

  function handleUpdateUser(data) {
    const jwt = localStorage.getItem("jwt");
    setIsFormSaved(true);
    mainApi
      .editUserData(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        setInfoTooltip({
          message: 'Данные пользователя успешно обновлены',
          isOpen: true,
          success: true,
        });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setInfoTooltip({
            message: 'Пользователь с указанным email уже существует',
            isOpen: true,
            success: false,
          })
          return false;
        } else {
          setInfoTooltip({
            message: 'При обновлении профиля произошла ошибка',
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
      .finally(() => setIsFormSaved(false))
  } 

  function signtOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setCurrentUser("");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getSavedMovies(jwt)
      .then((savedMovies) => setSavedMovies(savedMovies))
      .catch((err) => {
        if (err.statusCode === 500) {
          setInfoTooltip({
            message: `На сервере произошла ошибка`,
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
    if (moviesState) {
      restoreState(moviesState);
    }
  }, []);

  function handleSearchMovies() {
    if (movies.length === 0) {
      setMoviesIsSearched(true);
      setLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((err) => {
          if (err.statusCode === 500) {
            setInfoTooltip({
              message: `На сервере произошла ошибка`,
              isOpen: true,
              success: false,
            })
            return false;
          }
        })
        .finally(() => setLoading(false));
    } else {
      filterMovies();
    }
  }
  
    function handleSearchSavedMovies() {
      filterSavedMovies();
    }
  
    function handleLike(card) {
      const jwt = localStorage.getItem("jwt");
      mainApi
        .addMovie({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: MOVIES_API_URL + card.image.url,
          trailerLink: card.trailerLink,
          thumbnail: MOVIES_API_URL + card.image.formats.thumbnail.url,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        }, jwt
      )
        .then((movie) => addMovieToSaved(movie))
        .catch((err) => (err));
    }
  
    function handleDislike(savedMovie) {
      const jwt = localStorage.getItem("jwt");
      mainApi
        .deleteMovie(savedMovie._id, jwt)
        .then(() => removeMovieFromSaved(savedMovie))
        .catch((err) => (err));
    }
  
    const handleResize = debounce(() => {
      setWindowSize(window.innerWidth);
    }, 100);
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [handleResize]);

  return (
    <div className={`app ${pathname === '/' && "app_color_blue"}`}>
    {isPreloading ? (
      <Preloader />
    ) : (
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          loggedIn={loggedIn} />
          <Routes>
            <Route 
              path="/" 
              element={<Main />}
            />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute 
                component={Movies} 
                loggedIn={loggedIn} 
                onSearch={handleSearchMovies}
                onLike={handleLike}
                onDislike={handleDislike}
                isLoading={isLoading}
                windowSize={windowSize} 
                />
              }
            />
            <Route 
              path="/saved-movies" 
              element={
                <ProtectedRoute 
                  component={SavedMovies} 
                  loggedIn={loggedIn} 
                  onSearch={handleSearchSavedMovies}
                  onDislike={handleDislike}
                  windowSize={windowSize} 
                />
              }
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute 
                  component={Profile} 
                  isFormSaved={isFormSaved}
                  loggedIn={loggedIn} 
                  onUpdateUser={handleUpdateUser} 
                  signtOut={signtOut}
                />
              }
            />
            <Route 
              path="/signup" 
              element={
                <Register 
                  isFormSaved={isFormSaved}
                  onRegister={handleRegister} 
                  loggedIn={loggedIn} 
                  success={infoTooltip.success}
                />
              }
            />
            <Route 
              path="/signin" 
              element={
                <Login
                  isFormSaved={isFormSaved}
                  handleLogin={handleLogin} 
                  loggedIn={loggedIn}
                />
              } 
            />
            <Route 
              path="*" 
              element={<ErrorNotFound/>} 
            />
          </Routes>
          <InfoTooltip 
            onClose={handleClosePopup} 
            infoTooltip={infoTooltip}
          />
        <Footer />
      </CurrentUserContext.Provider>
    )}
    </div>
  );
}

export default App;