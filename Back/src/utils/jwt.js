const jwt = require('jsonwebtoken')

const generateKey = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: 5 * 60 })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateKey, verifyToken }
