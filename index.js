const Application = require('./src/framework/Application')
const userRouter = require('./src/user_router')
const JsonParser = require('./src/framework/JsonParser')
const BodyParser = require('./src/framework/BodyParser')
const UrlParser = require('./src/framework/UrlParser')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT
const app = new Application()
const url = 'mongodb+srv://vitalymih:REUE5zVWBAnbW3o4@cluster.mlkhavm.mongodb.net/?retryWrites=true&w=majority'

app.useMiddleware(JsonParser)
app.useMiddleware(UrlParser('http://localhost:5001'))
app.useMiddleware(BodyParser)
app.addRouter(userRouter)

const start = async() => {
  try {
    await mongoose.connect(url)
    app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
  } catch (error) {
    console.log('Error during connection: ' + error)
  }
}

start()
