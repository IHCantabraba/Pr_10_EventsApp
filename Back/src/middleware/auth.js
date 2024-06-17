const User = require('../api/models/users')
const { verifyToken } = require('../utils/jwt')
const mongoose = require('mongoose')
const isAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    console.log(parsedToken)
    const { _id } = verifyToken(parsedToken)
    console.log(new mongoose.Types.ObjectId(_id))
    const user = await User.findById(_id)
    console.log(user)
    if (user) {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json(`User Id not found`)
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json(error)
  }
}
const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  try {
    const { id } = verifyToken(token)
    const user = await User.findById(id)
    if (user) {
      if (user.rol === 'admin') {
        user.password = null
        req.user = user
        next()
      } else {
        return res.status(400).json(`Unauthorised`)
      }
    } else {
      return res.status(400).json(' user not found')
    }
  } catch (error) {
    return res.status(400).json(`Error occurred while checking adming rol`)
  }
}
module.exports = { isAuth, isAdmin }
