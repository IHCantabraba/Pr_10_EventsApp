const {
  registerAttendance,
  getAllAttendance
} = require('../controllers/attendances')
const reservationRouter = require('express').Router()

reservationRouter.get('/', getAllAttendance)
reservationRouter.post('/:id', registerAttendance)

module.exports = { reservationRouter }
