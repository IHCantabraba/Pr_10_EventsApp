const mongoose = require('mongoose')

const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

/* esquema de evento */
const attendanceSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      validate: [ValidateEmail, 'Please fill a valid email address']
    },
    password: { type: String, required: true, trim: true },
    eventos: { type: mongoose.Types.ObjectId, ref: 'events' }
  },
  { timestamp: true, collection: 'attendances' }
)

/* modelo de evento */
const Attendance = mongoose.model(
  'attendances',
  attendanceSchema,
  'attendances'
)
/* exportar modelo */
module.exports = Attendance
