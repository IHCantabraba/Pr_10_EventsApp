import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login/Login'
import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
// onsubmit="${submitRegister}" enctype="multipart/form-data"
/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page" >
      ${InputElem('text', 'Username', 'username', '', 'required')}
      ${InputElem('text', 'email', 'email', '', 'required')}
      ${InputElem('password', 'Password', 'password', '', 'required')}
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
  document.querySelector('#sumitRegister').addEventListener('click', () => {
    submitRegister()
  })
}

const submitRegister = async () => {
  try {
    const form = document.querySelector('#register-page')
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
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
    if (password === Repeatedpassword) {
      const data = new FormData(form)
      data.append('nombre', username)
      data.append('email', email)
      data.append('password', password)
      data.append('img', avatar)
      data.append('rol', rol)
      console.log(data.entries())
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        body: data,
        mode: 'cors',
        cache: 'default'
      })
      console.log(response.status, response.ok)
      if (response.ok) {
        alert(`Please, log in with your credentials`)
        Login()
      } else {
        document
          .querySelector('main')
          .append(
            MsgTemplate('Fill all needed fields!', './redcross.png', 'bad')
          )

        document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
        setTimeout(() => {
          Register()
        }, 2000)
      }
    } else {
      document
        .querySelector('main')
        .append(MsgTemplate('Password mismatch!', './redcross.png', 'bad'))

      document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
      setTimeout(() => {
        Register()
        /* mantener los campos introducidos */
        document.querySelector('#username').value = username
        document.querySelector('#email').value = email
      }, 2000)
    }
  } catch (error) {
    console.log(error)
  }
}
export default Register
