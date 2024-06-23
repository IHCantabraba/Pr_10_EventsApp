const Event = require('../models/events')
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('users')
    console.log(`${events.length} events collected`)
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
    return res.status(200).json(event)
  } catch (error) {
    return res.status(400).json(`Error occurred while getting event: ${error}`)
  }
}
const CancelEvent = async (req, res, next) => {
  console.log('inside update')
  try {
    const { id } = req.params
    const newEvent = new Event(req.body)
    const oldEvent = await Event.findById(id)
    console.log(req.body)
    if (req.body.estado) {
      newEvent.estado = req.body.estado
    }
    newEvent._id = id
    newEvent.limitParticipantes = oldEvent.limitParticipantes

    /* TODO añadir asistencias y mantener las que haya */

    const userUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    })
    return res.status(200).json(`User succesfully updated, ${userUpdated}`)
  } catch (error) {
    return res.status(400).json(`Error occurred while updating ${error}`)
  }
}
module.exports = { getAllEvents, getEvent, CancelEvent }
