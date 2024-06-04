const express = require('express')
require('dotenv').config()
const { connectDB } = require('./src/config/db')
const cors = require('cors')
const userRouter = require('./src/api/routes/users')
const { cloudinaryConfig } = require('./src/config/cloudinary')
const eventRouter = require('./src/api/routes/events')
const app = express()
const PORT = 3000
/* coonnect to Mongo DB */
connectDB()
cloudinaryConfig()
/* configure to accept json structure */
app.use(express.json())
/* configure to access from different ip (front and back end) */
app.use(cors())

/* router a los distintos modelos */
/* usuarios */
app.use('/api/v1/users', userRouter)
/* eventos */
app.use('/api/v1/events', eventRouter)
/* asistentes */
// app.use('/api/attendees', attend)
/* Not found Root */

app.use('*', (req, res, next) => {
  return res.status(404).json(`Route not found`)
})

/* listen port for backend */
app.listen(PORT, () => {
  console.log(`server running at: htpp://localhost:${PORT}`)
})
