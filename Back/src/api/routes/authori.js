const { isAuth } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const {
  getUserByID,
  getAllusers,
  register,
  login,
  updatedUser,
  deleteUser,
  registerEvent
} = require('../controllers/users')
const authRouter = require('express').Router()

authRouter.post('/register', upload.single('img'), register)
authRouter.post('/login', login)

module.exports = authRouter
