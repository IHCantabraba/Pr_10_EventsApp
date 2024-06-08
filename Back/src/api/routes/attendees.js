const { getAllAttendance } = require('../controllers/attendances')
const attendeesRouter = require('express').Router()

attendeesRouter.get('/', getAllAttendance)

module.exports = { attendeesRouter }
