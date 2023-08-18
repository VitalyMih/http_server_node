const users = [
  { id: 1, name: 'Vitalii' },
  { id: 2, name: 'Georgii' }
]

const getUsers = (req, res) => {
  if (req.params.user_id) {
    res.send(users.find((user) => user.id === Number(req.params.user_id)))
  }
  res.send(users)
}

const createUser = (req, res) => {
  const user = req.body
  users.push(user)
  res.send(user)
}

module.exports = {
  getUsers,
  createUser
}
