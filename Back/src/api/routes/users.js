const { isAuth, isAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/file')

const {
  getUserByID,
  getAllusers,
  register,
  login,
  updatedUser,
  deleteUser,
  registerEvent,
  eventReservation
} = require('../controllers/users')
const userRouter = require('express').Router()

userRouter.get('/', [isAdmin], getAllusers)
userRouter.get('/:id', getUserByID) /*  [isAuth], */
userRouter.post('/register', upload.single('img'), register)
userRouter.post('/login', login)
userRouter.post('/events', [isAuth], upload.single('img'), registerEvent) /* */
userRouter.post('/:id', [isAuth], upload.single('img'), updatedUser)
userRouter.delete('/:id', [isAdmin], deleteUser)

module.exports = userRouter
