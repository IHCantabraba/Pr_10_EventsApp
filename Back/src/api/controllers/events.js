const Event = require('../models/events')
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    console.log(`${events.length} evets collected`)
    return res.status(200).json(events)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting all events: ${error}`)
  }
}

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    return res.status(200).json(`Event search is ${event}`)
  } catch (error) {
    return res.status(400).json(`Error occurred while getting event: ${error}`)
  }
}
module.exports = { getAllEvents, getEvent }
