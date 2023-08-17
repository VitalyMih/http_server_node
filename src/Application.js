const http = require('http')
const EventEmitter = require('events')

// endpoints: {
//   '/users': {
//     'GET': handler1,
//     'POST': handler2
//   }
// }

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter()
    this.server = this._createServer()
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path]
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method]
        this.emitter.on(this._emittedMask(path, method), (req, res) => handler(req, res))
      })
    })
  }

  listen(port, callBack) {
    return this.server.listen(port, callBack)
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(this._emittedMask(req.url, req.method), req, res)
      if (!emitted) {
        res.end('Does not exist!')
      }
    })
  }

  _emittedMask(path, method) {
    return `[${path}]:[${method}]`
  }
}
