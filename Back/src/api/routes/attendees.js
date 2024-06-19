const {
  getAllAttendance,
  getAttendeByID
} = require('../controllers/attendances')
const attendeesRouter = require('express').Router()

attendeesRouter.get('/', getAllAttendance)
attendeesRouter.get('/:id', getAttendeByID)

module.exports = { attendeesRouter }
