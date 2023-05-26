class Api {
    constructor ({url, headers}) {
      this._url = url;
      this._headers = headers;
    }
    // проверка получения ответа с сервера
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    //загрузка карточек с сервера
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
  
      .then(res => this._checkResponse(res))
    }
  
    // загрузка данных пользователя с сервера
    getUserInfoApi() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
  
      .then(res => this._checkResponse(res))
    }
  
  
    // отправка данных редактирования профиля на сервер
    setUserInfoApi({name, about}) {
      return fetch (`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(res => this._checkResponse(res))
    }
  
      // oбновление аватара пользователя
      editNewAvatar ({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar,
          })
        })
        .then(res => this._checkResponse(res))
      }
  
    // добавление новой карточки на сервер
    addNewCard ({name, link}) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(res => this._checkResponse(res))
    }
  
    // DELETE-запрос удаления карточки
    deledeCard(cardId) {
      return fetch (`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
  
    //постановка лайка
    setLikeCardApi (cardId) {
      return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
  
    //снятие лайка
    removeLikeCardApi (cardId) {
      return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
  }
  
 const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-65",
    headers: {
      authorization: "42cd8cbf-e4e5-4d62-a54f-69f52c320e73",
      "Content-Type": "application/json",
    },
  });
  
    
  
  export default  api;
  
  
  
  
  
  