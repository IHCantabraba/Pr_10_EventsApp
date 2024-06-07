const express = require('express')
require('dotenv').config()
const { connectDB } = require('./src/config/db')
const cors = require('cors')
const userRouter = require('./src/api/routes/users')
const { cloudinaryConfig } = require('./src/config/cloudinary')
const eventRouter = require('./src/api/routes/events')
const authRouter = require('./src/api/routes/authori')
const { reservationRouter } = require('./src/api/routes/attendances')

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
/*auth */
// app.use('/api/auth', authRouter)
/* usuarios */
app.use('/api/users', userRouter)
/* eventos */
app.use('/api/events', eventRouter)
/* asistentes */
app.use('/api/user/attendees', reservationRouter)
/* Not found Root */

app.use('*', (req, res, next) => {
  return res.status(404).json(`Route not found`)
})

/* listen port for backend */
app.listen(PORT, () => {
  console.log(`server running at: htpp://localhost:${PORT}`)
})
