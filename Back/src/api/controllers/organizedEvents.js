const Event = require('../models/events')

const getPublisherEvents = async (req, res, next) => {
  try {
    /* id del publicador */
    const { id } = req.params
    console.log(id)
    const events = await Event.find({ createdBy: id }).populate('users')
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(`No event organized for the publisher`)
  }
}
module.exports = { getPublisherEvents }
