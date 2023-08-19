const User = require('./user_model')

const getUsers = async(req, res) => {
  let users
  if (req.params.user_id) {
    users = await User.findById(req.params.user_id)
  } else {
    users = User.find()
  }
  res.send(users)
}

const createUser = async(req, res) => {
  const user = User.create(req.body)
  res.send(user)
}

module.exports = {
  getUsers,
  createUser
}
