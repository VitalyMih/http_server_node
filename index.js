const Application = require('./src/framework/Application')
const userRouter = require('./src/user_router')
const JsonParser = require('./src/framework/JsonParser')
const BodyParser = require('./src/framework/BodyParser')
const UrlParser = require('./src/framework/UrlParser')
require('dotenv').config()

const app = new Application()
app.useMiddleware(JsonParser)
app.useMiddleware(UrlParser('http://localhost:5001'))
app.useMiddleware(BodyParser)
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))

app.addRouter(userRouter)
