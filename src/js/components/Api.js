export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(result.status);
  }

  _setHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  getCartData() {
    return fetch(`${this._baseUrl}/cart`, {
      headers: this._setHeaders(),
    })
      .then(res => this._checkResponse(res));
  }

  getParamsData() {
    return fetch(`${this._baseUrl}/params`, {
      headers: this._setHeaders(),
    })
      .then(res => this._checkResponse(res));
  }
}
