import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login'
/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page">
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'passwordRepeted')}
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
const submitRegister = async () => {
  console.log('ready to get data to register')
  try {
    const username = documento.querySelector('#username').value
    const password = document.querySelector('#password').value
    const passwordRepeted = document.querySelector('#passwordrepeted').value
    const email = document.querySelector('#email').value
    const avatar = document.querySelector('#avatar').value
    console.log(password, passwordRepeted)
    if (password !== passwordRepeted) {
      console.log('Password does not match ')
    }
    const body = new FormData()
    body.set('nombre', username)
    body.set('email', email)
    body.set('password', password)
    body.set('img', avatar)
    const data = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      body: body
    })
    alert(`Please, log in with your credentials`)
    Login()
  } catch (error) {
    console.log(error)
  }
}
/* Register page */
const Register = () => {
  document.querySelector('main').innerHTML = template()

  document.querySelector('.registerBtn').addEventListener('click', () => {
    console.log('register btn clicked')
    submitRegister()
  })
}
export default Register
