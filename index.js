const Application = require('./src/Application')
const Router = require('./src/Router')
require('dotenv').config()

const app = new Application()
const router = new Router()

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))

router.get('/users', (req, res) => {
  res.end('USERS HERE')
})

router.get('/posts', (req, res) => {
  res.end('POSTS HERE')
})

app.addRouter(router)