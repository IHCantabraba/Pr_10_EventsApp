const Attendance = require('../models/attendances')
const Event = require('../models/events')
const User = require('../models/users')

const registerAttendance = async (req, res, next) => {
  /* comprobar que no exista ya */
  /* TODO already registerd */
  try {
    const { id } = req.params
    console.log(id)
    const EventInfo = await Event.findById(id)
    if (EventInfo !== 'undefined') {
      console.log(EventInfo.titulo)
      /* comprobar que el usuario no esté ya registrado */
      if (EventInfo.users.includes(req.body.users)) {
        console.log('user already registerd')
        let msg = { msg: 'user already registerd' }
        return res.status(201).json(msg)
      } else {
        EventInfo.users.push(req.body.users)
        const eventupdated = await Event.findByIdAndUpdate(id, EventInfo, {
          new: true
        })
        const newReserve = new Attendance(req.body)
        const reservation = await newReserve.save()
        return res.status(200).json(reservation)
      }
    } else {
      console.log(`can not find event`)
    }
  } catch (error) {
    return res.status(400).json(`Error while registering event: ${error}`)
  }
}
const getAllAttendance = async (req, res, next) => {
  try {
    const attendee = await Attendance.find().populate('events')
    return res.status(200).json(attendee)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting all attendance: ${error}`)
  }
}

const getAttendeByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await Attendance.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting the user: ${error}`)
  }
}
module.exports = { registerAttendance, getAllAttendance, getAttendeByID }
