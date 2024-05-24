const { isAuth, isAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const {
  getUserByID,
  getAllusers,
  register,
  login,
  updatedUser,
  deleteUser
} = require('../controllers/users')
const userRouter = require('express').Router()

userRouter.get(
  '/',
  [isAdmin],
  getAllusers
) /* TOODO añadir "isAdmin function" */
userRouter.get('/:id', [isAuth], getUserByID)
userRouter.post('/register', upload.single('img'), register)
userRouter.post('/login', login)
userRouter.post('/:id', [isAuth], upload.single('img'), updatedUser)
userRouter.delete('/:id', [isAdmin], deleteUser)

module.exports = userRouter
