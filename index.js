const http = require('http')
require('dotenv').config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }),
  res.end('<h1>Server works!</h1>')
})

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
