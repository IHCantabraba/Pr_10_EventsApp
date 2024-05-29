const { isAuth, isAdmin } = require('../../middleware/auth')
const { getAllEvents, getEvent } = require('../controllers/events')
const eventRouter = require('express').Router()

eventRouter.get('/', getAllEvents) /*[isAuth], */
eventRouter.get('/:id', [isAuth], getEvent)

module.exports = eventRouter
