const Attendance = require('../models/attendances')
const Event = require('../models/events')
const User = require('../models/users')

const registerAttendance = async (req, res, next) => {
  /* comprobar que no exista ya */

  try {
    const { id } = req.params
    console.log(id)
    /* Buscar el evento */
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
        /* TODO si existe ya un attende con ese nombre, añadirle un evento nuevo sino, crearlo */
        const nombre = req.body.nombre
        console.log(`name is: ${nombre}`)
        /* buscar si ese usuario ya es asistente de algún evento */
        const existente = await Attendance.findOne({ nombre })
        console.log(existente)
        if (existente) {
          existente.events.push(id)
          const updateAttendance = await Attendance.findByIdAndUpdate(
            existente.id,
            existente,
            { new: true }
          )
          console.log(` Attendee New list: ${existente}`)
          return res.status(200).json(updateAttendance)
        } else {
          const newReserve = new Attendance(req.body)
          const reservation = await newReserve.save()
          return res.status(200).json(reservation)
        }
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

const getAttendeByName = async (req, res, next) => {
  try {
    const { name } = req.params
    const attendee = await Attendance.find({ name })
    return res.status(200).json(attendee)
  } catch (error) {}
}
module.exports = { registerAttendance, getAllAttendance, getAttendeByID }
