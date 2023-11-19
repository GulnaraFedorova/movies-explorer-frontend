import { MOVIES_API_URL } from './constants';

class MoviesApi {
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

  getMovies() {
    return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}
 
const moviesApi = new MoviesApi ({
  url: MOVIES_API_URL,
});

export default moviesApi; 