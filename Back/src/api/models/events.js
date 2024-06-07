const mongoose = require('mongoose')

/* esquema de evento */
const eventSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, unique: true },
    fecha: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true, trim: true },
    longDescription: {
      type: String,
      required: false,
      trim: true,
      default:
        ' ...No description available right now. Sorry for the inconvenience ...'
    },
    reserva: { type: Boolean, required: true },
    img: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
  },
  { timestamp: true, collection: 'events' }
)

/* modelo de evento */
const Event = mongoose.model('events', eventSchema, 'events')
/* exportar modelo */
module.exports = Event
