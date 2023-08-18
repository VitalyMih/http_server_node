// endpoints: {
//   '/users': {
//     'GET': handler1,
//     'POST': handler2
//   }
// }

module.exports = class Router {
  constructor() {
    this.endpoints = {}
  }

  get(path, handler) {
    this._request('GET', path, handler)
  }

  post(path, handler) {
    this._request('POST', path, handler)
  }

  put(path, handler) {
    this._request('PUT', path, handler)
  }

  _request(method = 'GET', path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {}
    }

    const endpoint = this.endpoints[path]
    if (endpoint[method]) {
      throw new Error(`URL ${path} with method ${method} already exist`)
    }
    endpoint[method] = handler
  }
}
