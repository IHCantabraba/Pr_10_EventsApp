const { isAuth } = require('../../middleware/auth')
const { getPublisherEvents } = require('../controllers/organizedEvents')
const eventOrganizedRouter = require('express').Router()

eventOrganizedRouter.get('/:id', [isAuth], getPublisherEvents)

module.exports = eventOrganizedRouter
