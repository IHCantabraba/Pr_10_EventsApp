import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login/Login'
// onsubmit="${submitRegister}" enctype="multipart/form-data"
/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page" >
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'passwordRepeted')}
      <p id="publisherOption">¿Quieres publicar eventos?</p>
      <div id="publisher">
        <input type="checkbox"  id="isPublisher"></input>
        <label id="publicara" for="willPublicate">Si</label>
      </div>
      ${InputElem('file', '', 'avatar', 'avatar')}
      <div id="registerBtns">
        ${Btn('sumitRegister', 'Enviar', 'sumitRegister')}
        ${Btn('cancelBtn', 'Cancel', 'cancel')}
      </div>
    </form>
  </section>
`
/* Register page */
const Register = () => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#sumitRegister').addEventListener('click', () => {
    submitRegister()
    Login()
  })
}

const submitRegister = async () => {
  console.log('ready to get data to register')
  try {
    const form = document.querySelector('#register-page')
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const avatar = document.querySelector('.avatar').files[0]
    let rol
    if (document.querySelector('#isPublisher').checked) {
      console.log('checked')
      rol = 'publisher'
    } else {
      rol = 'user'
    }

    const data = new FormData(form)
    data.append('nombre', username)
    data.append('email', email)
    data.append('password', password)
    data.append('img', avatar)
    data.append('rol', rol)
    console.log(data.entries())
    await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: data,
      mode: 'cors',
      cache: 'default'
    })
    alert(`Please, log in with your credentials`)
  } catch (error) {
    console.log(error)
  }
}
export default Register
