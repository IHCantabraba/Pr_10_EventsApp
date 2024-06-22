const { deleteFile } = require('../../utils/deleteFile')
const Event = require('../models/events')
const User = require('../models/users')

const getAllusers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting all users: ${error}`)
  }
}
const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting the user: ${error}`)
  }
}

const updatedUser = async (req, res, next) => {
  console.log('inside update')
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    const oldUser = await User.findById(id)
    if (req.file) {
      console.log('changing avatar img')
      deleteFile(oldUser.img)
    }
    newUser.img = req.file.path
    newUser._id = id
    /* TODO añadir asistencias y mantener las que haya */

    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res.status(200).json(`User succesfully updated, ${userUpdated}`)
  } catch (error) {
    return res.status(400).json('Error occurred while updating ')
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if (deleteUser.img !== 'Undefined') {
      deleteFile(deletedUser.img)
    } else {
      console.log('No img to delete. ')
    }
    return res.status(200).json(`Succesfully deleted User: ${deletedUser}`)
  } catch (error) {
    return res.status(400).json(`Error ocurred while deleting User: ${error}`)
  }
}
const registerEvent = async (req, res, next) => {
  try {
    console.log(req.body)
    const eventDuplicated = await Event.findOne({ titulo: req.body.titulo })
    if (eventDuplicated) {
      return res.satus(400).json(`Event is already register`)
    }
    const newEvent = new Event(req.body)
    if (req.file) {
      console.log(`Adding file`)
      newEvent.img = req.file.path
    } else {
      console.log(`No image passed for the event`)
    }
    const event = await newEvent.save()
    return res.status(200).json(event)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while registering event: ${error}`)
  }
}

module.exports = {
  getAllusers,
  getUserByID,
  updatedUser,
  deleteUser,
  registerEvent
}
