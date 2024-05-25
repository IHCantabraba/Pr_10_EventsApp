import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import Login from '../Login/Login'

/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page" onsubmit="${submitRegister()}">
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'passwordRepeted')}
      ${InputElem('file', '', 'avatar', 'avatar')}
      </div>
      <div id="registerBtns">
        ${InputElem('submit', '', 'sumitRegister')}
        ${Btn('cancelBtn', 'Cancel', 'cancel')}
      </div>
    </form>
  </section>
`

/* TODO submitRegistration */
const submitRegister = async () => {
  console.log('ready to get data to register')
  try {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const passwordRepeted = document.querySelector('#passwordRepeted').value
    const email = document.querySelector('#email').value
    const avatar = document.querySelector('.avatar').value
    if (password !== passwordRepeted) {
      console.log('Password does not match ')
    }
    // const body = new FormData()
    // body.append('nombre', username)
    // body.set('email', email)
    // body.set('password', password)
    // body.set('img', avatar)
    // const bodyRequest = body.entries()
    // console.log(`formData: ${[...bodyRequest]}`)
    await fetch('http://localhost:3000/api/v1/users/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        nombre: username,
        email: email,
        password: password,
        img: avatar
      }),
      mode: 'cors',
      cache: 'default'
    })
      .then((res) => res.json())
      .then((info) => console.log(info))
    alert(`Please, log in with your credentials`)
    // Login()
  } catch (error) {
    console.log(error)
  }
}
/* Register page */
const Register = () => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#sumitRegister').addEventListener('click', () => {
    submitRegister()
    Login()
  })
}
export default Register
