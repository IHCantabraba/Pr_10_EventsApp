import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import DragDrop from '../../components/common/DragDrop/DragDrop'
/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page">
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'password')}
      ${InputElem('file', 'select profile img', 'avatar')}
      </div>
      <div id="registerBtns">
        ${Btn('registrationBtn', 'Register', 'submitRegistration')}
        ${Btn('cancelBtn', 'Cancel', 'cancel')}
      </div>
    </form>
  </section>
`

/* TODO submitRegistration */

/* Register page */
const Register = () => {
  document.querySelector('main').innerHTML = template()

  document.querySelector('#registrationBtn').addEventListener('click', () => {
    console.log('registering')
  })

  /* drop zone implementation */
  // const dropzone = document.querySelector('#drop_zone')

  // dropzone.addEventListener('dragenter', dragenter, false)
  // dropzone.addEventListener('dragover', dragover, false)
  // dropzone.addEventListener('drop', drop, false)
  // function dragenter(e) {
  //   e.stopPropagation()
  //   e.preventDefault()
  // }
  // function dragover(e) {
  //   e.stopPropagation()
  //   e.preventDefault()
  // }
  // function drop(e) {
  //   e.stopPropagation()
  //   e.preventDefault()
  //   let dt = e.dataTransfer
  //   let files = dt.files
  //   handleFiles(files)
  // }
  // function handleFiles(files) {
  //   for (var i = 0; i < files.length; i++) {
  //     // get the next file that the user selected
  //     var file = files[i]
  //     var imageType = /image.*/

  //     // don't try to process non-images
  //     if (!file.type.match(imageType)) {
  //       continue
  //     }

  //     // a seed img element for the FileReader
  //     var img = document.createElement('img')
  //     img.classList.add('obj')
  //     img.file = file

  //     // get an image file from the user
  //     // this uses drag/drop, but you could substitute file-browsing
  //     var reader = new FileReader()
  //     reader.onload = (function (aImg) {
  //       return function (e) {
  //         aImg.onload = function () {
  //           // draw the aImg onto the canvas
  //           var canvas = document.createElement('canvas')
  //           var ctx = canvas.getContext('2d')
  //           canvas.width = aImg.width
  //           canvas.height = aImg.height
  //           ctx.drawImage(aImg, 0, 0)

  //           // make the jpeg image
  //           var newImg = new Image()
  //           newImg.onload = function () {
  //             newImg.id = 'newest'
  //             document.body.appendChild(newImg)
  //           }
  //           newImg.src = canvas.toDataURL('image/jpeg')
  //         }
  //         // e.target.result is a dataURL for the image
  //         aImg.src = e.target.result
  //       }
  //     })(img)
  //     reader.readAsDataURL(file)
  //   } // end for
  // } // end handleFiles
}
export default Register
