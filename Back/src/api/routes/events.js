const { isAuth, isAdmin } = require('../../middleware/auth')
const { getAllEvents, getEvent } = require('../controllers/events')
const eventRouter = require('express').Router()

eventRouter.get('/', [isAuth], getAllEvents) /*[isAuth], */
eventRouter.get('/:id', getEvent)

module.exports = eventRouter
