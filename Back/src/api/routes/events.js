const { isAuth } = require('../../middleware/auth')
const { getAllEvents, getEvent, CancelEvent } = require('../controllers/events')
const eventRouter = require('express').Router()

eventRouter.get('/', [isAuth], getAllEvents) /*[isAuth], */
eventRouter.get('/:id', getEvent)
eventRouter.put('/:id', [isAuth], CancelEvent)

module.exports = eventRouter
