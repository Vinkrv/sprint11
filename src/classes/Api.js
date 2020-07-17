export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.body = config.body;
    this._initialRequest = this._initialRequest.bind(this);
  }

  getInfoUser() {
    return fetch(`${this.url}/users/me`, {
    headers: this.headers
    })
    .then(res => this._initialRequest(res))
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
    headers: this.headers
    })
    .then(res => this._initialRequest(res))
  }

  patchInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(res => this._initialRequest(res))
  }

  _initialRequest(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

}
