const jwt = require('jsonwebtoken')

const generateKey = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 5 * 60 })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateKey, verifyToken }
