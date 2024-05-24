const mongoose = require('mongoose')

/* esquema de evento */
const eventSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    fecha: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true, trim: true },
    reserva: { type: boolean, required: true }
  },
  { timestamp: true, collection: 'events' }
)

/* modelo de evento */
const Event = mongoose.model('events', eventSchema, 'events')
/* exportar modelo */
module.exports = Event
