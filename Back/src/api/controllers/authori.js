const User = require('../models/users')
const { generateKey } = require('../../utils/jwt')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    /* comprobar que no exista ya */
    const userDuplicated = await User.findOne({ nombre: req.body.nombre })
    if (userDuplicated) {
      return res.status(400).json('User already exists')
    }
    const newUser = new User(req.body)
    if (req.file) {
      console.log('adding file')
      newUser.img = req.file.path
    } else {
      console.log('no image passed')
    }
    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json(`Error while registering: ${error}`)
  }
}

const login = async (req, res, next) => {
  try {
    const { nombre, password } = req.body
    const user = await User.findOne({ nombre })
    if (!user) {
      return res.status(400).json(`user name '${nombre}' not found`)
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(user._id)
      return res.status(200).json({ token, user })
    }
    return res.status(400).json(`user or password incorrect`)
  } catch (error) {
    return res.status(400).json(`Error while login: ${error}`)
  }
}
module.exports = {
  register,
  login
}
