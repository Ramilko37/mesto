// const modifiedFetch = (url, headers) => {
//   return fetch(url, headers)
//     .then(res => {
//       if (res.ok) {
//         return res.json();

//       }

//       // если ошибка, отклоняем промис
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .catch(err => console.log(err));
// }

const resHandler = res => {
  console.log(res.status);
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}



export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }


  getContent() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]) // [cards,userInfo]
  }




  // Загрузка карточек  сервера
  getInitialCards() {
    // return fetch(`${this._url}/cards`, {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(resHandler)
    

  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(resHandler)
    
  }

  // Редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(resHandler)
   

  }



  // Добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(resHandler)
    

  }

  //подтверждение удаления
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //счетчик лайков
  // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
  like(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(resHandler)
  

  }

  //отменить лайк
  dislike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(resHandler)
    

  }

  //обновить аватар
  refreshAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.url,
        })
      })
      .then(resHandler)
      

  }



















}