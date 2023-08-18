module.exports = (req, res, callback) => {
  let body = ''
  req.on('data', (chunck) => body += chunck)
  req.on('end', () => {
    if (body) {
      req.body = JSON.parse(body)
    }
    callback(req, res)
  })
}
