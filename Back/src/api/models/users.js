const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
/* validar formato de email */
const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
/* esquema de usuario */
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      validate: [ValidateEmail, 'Please fill a valid email address']
    },
    password: { type: String, required: true, trim: true },
    rol: {
      type: String,
      required: false,
      default: 'user',
      enum: ['admin', 'user', 'publisher']
    },
    img: { type: String, required: false },
    folder: { type: String, required: false }
  },

  { timestamp: true, collection: 'users' }
)
/* encriptar contraseña antes de almacenarla */
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})
/* modelo de usuario */
const User = mongoose.model('users', userSchema, 'users')
/* exportar modelo */
module.exports = User
