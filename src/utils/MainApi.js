import { BASE_URL } from "./constants";

class mainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверка ответа
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  //Получение карточек с сервера
  getSavedMovies(id) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //Получение информации о пользователе
  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //Редактирования информации профиля
  setUserInfo(newName, newEmail) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //Сохранение фильма
  saveNewMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        thumbnail: thumbnail,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //Функция лайка


  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new mainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
