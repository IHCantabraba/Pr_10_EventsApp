const { registerAttendance } = require('../controllers/attendances')
const reservationRouter = require('express').Router()

reservationRouter.post('/:id', registerAttendance)

module.exports = { reservationRouter }
