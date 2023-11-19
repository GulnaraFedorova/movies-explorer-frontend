import { MAIN_API_URL } from './constants';

class MainApi {
  constructor(options) {
    this._url = options.url;
  }
 
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
 
  userRegistration = ({ email, password, name }) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(this._checkResponse);
  };
 
  userAuthorization = ({ email, password }) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then(this._checkResponse)
  };
 
  tokenValidation = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(this._checkResponse);
  };

  getUser(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
 
  editUserData(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
    .then(this._checkResponse);
  };
 
  getSavedMovies(token){
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(this._checkResponse);
  };
 
  addMovie(movie, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        body: JSON.stringify(movie)
    })
    .then(this._checkResponse);
  };
 
  deleteMovie(movieId, token) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(this._checkResponse);
  }
}
 
const mainApi = new MainApi ({
    url: MAIN_API_URL,
});
 
export default mainApi; 