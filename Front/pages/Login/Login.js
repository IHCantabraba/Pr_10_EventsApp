import './Loing.css'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import Events from '../Events/Events'
import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import rolPermisionFeatures from '../../utils/RolPermision'

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
        ${InputElem('text', 'username', 'LoginUser', '', 'required')}
        ${InputElem('password', 'Password', 'password', '', 'required')}
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
    if (!user.user.img) {
      icon.src = 'no-image.png'
      userName.textContent = user.user.nombre
    } else {
      icon.src = user.user.img
      userName.textContent = user.user.nombre
    }

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
    })
  }
}
const loginsubmit = async () => {
  try {
    /* recoger los datos de login */
    const username = document.querySelector('#LoginUser').value
    const password = document.querySelector('#password').value
    if (username === '' || password === '') {
      /* Events Btn header  */
      document
        .querySelector('main')
        .append(
          MsgTemplate(
            'Please Enter valid User and passwors',
            './redcross.png',
            'bad'
          )
        )
      RemoveMsgDiv()
    } else {
      /* enviar solicitud de login */
      const data = await fetch('http://localhost:3000/api/auth/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nombre: username, password: password })
      })

      if (data.ok) {
        const dataResponse = await data.json()
        const userIcon = document.querySelector('.userIcon')
        /* adding user name and icon to log session */
        if (dataResponse.user.img === 'undefined') {
          userIcon.src = 'no-image.png'
        } else {
          userIcon.src = dataResponse.user.img
        }
        const loggedName = document.querySelector('.userName')
        loggedName.innerHTML = dataResponse.user.nombre
        /* almacenar en sessionStorage  el usuairo logueado */
        sessionStorage.setItem('user', JSON.stringify(dataResponse))
        /* habilitar crear evento en funcion de los permisos del rol */
        rolPermisionFeatures()
        /* Events Btn header  */
        document
          .querySelector('main')
          .append(
            MsgTemplate('Longged Successfully', './green-check.png', 'good')
          )
        RemoveMsgDiv()
        setTimeout(() => {
          if (!document.querySelector('#events-section')) {
            Events()
          }
        }, 2000)
      }
    }
  } catch (error) {
    /* Events Btn header  */
    console.log(`error ${error}`)
    document
      .querySelector('main')
      .append(MsgTemplate('User or pasword incorrect', './redcross.png', 'bad'))
    RemoveMsgDiv()
  }
}
export default Login
