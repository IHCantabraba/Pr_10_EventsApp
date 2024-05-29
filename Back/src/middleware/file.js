const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req) => {
      if (req.folder) {
        return req.folder
      } else {
        let baseUrl = req.originalUrl.split('/').at(-1)
        console.log(`base url is: ${baseUrl}`)
        if (baseUrl === 'register') {
          baseUrl = 'users'
          console.log(`BaseUrl is: ${baseUrl}`)
          return `EventsApp/${baseUrl}`
        } else {
          return `EventsApp/${baseUrl}`
        }
      }
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
  }
})

const upload = multer({ storage })

module.exports = upload
