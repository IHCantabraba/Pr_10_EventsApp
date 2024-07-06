import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login/Login'
import notification from '../../utils/notification'
import registerErrorParser from '../../utils/registerErorParser'
import validatePassword from '../../utils/validatePassword'

/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page" >
      ${InputElem('text', 'Username', 'username', '', 'required')}
      ${InputElem('text', 'email', 'email', '', 'required')}
      ${InputElem('password', 'Password', 'Reg-password', '', 'required')}
      ${InputElem(
        'password',
        'Repeat Password',
        'passwordRepeted',
        '',
        'required'
      )}
      <p id="publisherOption">¿Quieres publicar eventos?</p>
      <div id="publisher">
        <input type="checkbox"  id="isPublisher"></input>
        <label id="publicara" for="willPublicate">Si</label>
      </div>
      <label for='avatar' class='custom-file-upload'>Select image</label>
      ${InputElem('file', '', 'avatar', 'avatar', '', 'required')}
      <div id="registerBtns">
        ${Btn('sumitRegister', 'Enviar', 'sumitRegister')}
        ${Btn('cancelBtn', 'Cancel', 'cancel')}
      </div>
    </form>
  </section>
`
/* Register page */
const Register = (user, email) => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#sumitRegister').addEventListener('click', (e) => {
    e.preventDefault()
    submitRegister()
  })
}

const submitRegister = async () => {
  try {
    const form = document.querySelector('#register-page')
    const username = document.querySelector('#username').value
    const password = document.querySelector('#Reg-password').value
    const Repeatedpassword = document.querySelector('#passwordRepeted').value
    const email = document.querySelector('#email').value
    const avatar = document.querySelector('.avatar').files[0]
    let rol
    if (document.querySelector('#isPublisher').checked) {
      console.log('checked')
      rol = 'publisher'
    } else {
      rol = 'user'
    }
    if (
      password === Repeatedpassword &&
      password !== '' &&
      Repeatedpassword !== ''
    ) {
      const data = new FormData(form)
      data.append('nombre', username)
      data.append('email', email)
      data.append('password', password)
      data.append('img', avatar)
      data.append('rol', rol)
      console.log(data.entries())
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: data,
        mode: 'cors',
        cache: 'default'
      })
      console.log(response.status, response.ok)
      const responseText = await response.text()
      console.log(responseText)
      if (response.ok) {
        alert(`Please, log in with your credentials`)
        notification('succesfully register', './green-check.png', 'good')
        setTimeout(() => {
          Login()
        }, 1500)
      }
      if (response.status === 400) {
        registerErrorParser(responseText)
      } //else {
      //   notification('Fill all needed fields!', './redcross.png', 'bad')
      // }
    } else {
      validatePassword(password, Repeatedpassword)
    }
  } catch (error) {
    console.log(error)
  }
}
export default Register
