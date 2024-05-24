const cloudinary = require('cloudinary').v2
const buildUrl = require('cloudinary-build-url')

const deleteFile = (imgUrl) => {
  try {
    const publicId = buildUrl.extractPublicId(imgUrl)

    console.log(`url to delete :${publicId}`)
    cloudinary.uploader.destroy(publicId, function (error, result) {
      console.log(result, error)
    })
  } catch (error) {
    console.log(`Error occurred trying to delete image `)
  }
}

module.exports = { deleteFile }
