const Attendance = require('../models/attendances')
const Event = require('../models/events')

const registerAttendance = async (req, res, next) => {
  /* comprobar que no exista ya */
  /* TODO already registerd */
  try {
    const newReserve = new Attendance(req.body)
    const reservation = await newReserve.save()
    const evento = req.body
    console.log(evento)
    const { id } = req.params
    console.log(id)
    const EventInfo = await Event.findById(id)
    console.log(EventInfo)
    if (EventInfo !== 'undefined') {
      console.log(EventInfo.titulo)
      EventInfo.asistentes.push(req.body.nombre)
      const eventupdated = await Event.findByIdAndUpdate(id, EventInfo, {
        new: true
      })
    } else {
      console.log(`can not find event: ${evento}`)
    }
    return res.status(201).json(reservation)
  } catch (error) {
    return res.status(400).json(`Error while registering event: ${error}`)
  }
}
const getAllAttendance = async (req, res, next) => {
  try {
    const attendee = await Attendance.find()
    return res.status(200).json(attendee)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting all attendance: ${error}`)
  }
}
module.exports = { registerAttendance, getAllAttendance }
