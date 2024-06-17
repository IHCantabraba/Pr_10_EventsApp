import './Loing.css'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import Events from '../Events/Events'
import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'

const template = () =>
  `
  <section id="login-form">
  ${
    sessionStorage.getItem('user')
      ? `<h2 id="alreadyLogged"> You are already logged. Redirecting to Events page... </h2> `
      : `
    <form id="login-page">
      <div id="loinginfo">
      <p id="LoginName">User name</p>
      <p id="LoginPassword">Password</p>
      </div>
      <div id="logindiv">
        ${InputElem('text', 'username', 'LoginUser')}
        ${InputElem('password', 'Password', 'password')}
      </div>
      ${Btn('LoginBtn', 'Login', 'submitLogin')}

    </form>`
  }
  </section>
`

const Login = () => {
  document.querySelector('main').innerHTML = template()
  if (document.querySelector('#alreadyLogged')) {
    /* asignar imagen y nombre al perfil del login en header si ya estaba logueado */

    const icon = document.querySelector('.userIcon')
    const userName = document.querySelector('.userName')
    const user = JSON.parse(sessionStorage.getItem('user'))

    icon.src = user.user.img
    userName.textContent = user.user.nombre
    /* abrir events age automáticamente si está logueado */

    setTimeout(() => {
      if (!document.querySelector('#events-section')) {
        Events()
      }
    }, 1000)
  }
  if (document.querySelector('#LoginBtn')) {
    document.querySelector('#LoginBtn').addEventListener('click', (e) => {
      e.preventDefault()
      loginsubmit()
      setTimeout(() => {
        if (!document.querySelector('#events-section')) {
          Events()
        }
      }, 3000)
    })
  }
}
const loginsubmit = async () => {
  const username = document.querySelector('#LoginUser').value
  const password = document.querySelector('#password').value
  const data = await fetch('http://localhost:3000/api/users/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ nombre: username, password: password })
  })
  const dataResponse = await data.json()
  const userIcon = document.querySelector('.userIcon')
  if (dataResponse.user.img === 'undefined') {
    userIcon.src = 'no-image.png'
  } else {
    userIcon.src = dataResponse.user.img
  }

  console.log(`Login server answer is: ${dataResponse.user.nombre}`)
  const loggedName = document.querySelector('.userName')
  loggedName.innerHTML = dataResponse.user.nombre

  sessionStorage.setItem('user', JSON.stringify(dataResponse))
  /* Events Btn header  */
  document
    .querySelector('main')
    .append(MsgTemplate('Longged Successfully', './green-check.png', 'good'))
  RemoveMsgDiv()
}
export default Login
