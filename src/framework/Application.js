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
    this.middlewares = []
  }

  useMiddleware(middleware) {
    this.middlewares.push(middleware)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path]
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._emittedMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  listen(port, callBack) {
    return this.server.listen(port, callBack)
  }

  _createServer() {
    return http.createServer((req, res) => {
      this.middlewares.forEach((middleware) => middleware(req, res, (parseReq, parseRes) => {
        const emitted = this.emitter.emit(this._emittedMask(parseReq.pathname, parseReq.method), parseReq, parseRes)
        if (!emitted) {
          res.end('Does not exist!')
        }
      }))
    })
  }

  _emittedMask(path, method) {
    return `[${path}]:[${method}]`
  }
}
