const { isAuth } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const { register, login } = require('../controllers/authori')
const authRouter = require('express').Router()

authRouter.post('/register', upload.single('img'), register)
authRouter.post('/login', login)

module.exports = authRouter
