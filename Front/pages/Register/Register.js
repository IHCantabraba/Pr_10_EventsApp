import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login/Login'
import notification from '../../utils/DomFunctions/notification'
import registerErrorParser from '../../utils/checks/registerErorParser'
import validatePassword from '../../utils/checks/validatePassword'
import changeSubmitBtnAppearence from '../../utils/LoadingFeedback/chageformSubmitBtnAppearence'
import autologinFromRegister from '../../utils/ServicePath/LoginFromRegister'
import LandingTemplate from '../../components/Landing/Landing'
import { apiBaseUrl } from '../../utils/ServicePath/apiBaseUrl'
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
    changeSubmitBtnAppearence('#sumitRegister', 'Registrando...', 'lightcoral')
    submitRegister()
  })
  document.querySelector('#cancelBtn').addEventListener('click', () => {
    LandingTemplate()
    /* register Btn Register page */
    document
      .querySelector('#landing-register-btn')
      .addEventListener('click', () => {
        Register()
      })
    /* login btn from register page */
    document
      .querySelector('#landing-login-btn')
      .addEventListener('click', () => Login())
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
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        body: data,
        mode: 'cors',
        cache: 'default'
      })
      console.log(response.status, response.ok)
      const responseText = await response.text()
      console.log(responseText)
      if (response.ok) {
        notification('succesfully register', './green-check.png', 'good')
        setTimeout(() => {
          autologinFromRegister(username, password)
          document.querySelector('#registerLink').remove()
        }, 1500)
      }
      if (response.status === 400) {
        registerErrorParser(responseText)
      }
    } else {
      validatePassword(password, Repeatedpassword)
    }
  } catch (error) {
    console.log(error)
  }
}
export default Register
