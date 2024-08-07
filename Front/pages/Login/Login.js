import './Loing.css'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import Events from '../Events/Events'
import rolPermisionFeatures from '../../utils/checks/RolPermision'
import setuserLogged from '../../utils/checks/setUserLogged'
import notification from '../../utils/DomFunctions/notification'
import changeSubmitBtnAppearence from '../../utils/LoadingFeedback/chageformSubmitBtnAppearence'
import alreadyLogeed from '../../utils/checks/alreadyLogged'
import { apiBaseUrl } from '../../utils/ServicePath/apiBaseUrl'
//`<h2 id="alreadyLogged"> You are already logged. Redirecting to Events page... </h2> `
const template = () =>
  `
  <section id="login-form">
  ${
    sessionStorage.getItem('user')
      ? alreadyLogeed()
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
      /* cambair estilo d ebotón para dar feedback */
      changeSubmitBtnAppearence('#LoginBtn', 'logueando..', 'lightcoral')

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
      notification(
        'Please Enter valid User and passwors',
        './redcross.png',
        'bad'
      )
      changeSubmitBtnAppearence('#LoginBtn', 'Login', 'black')
    } else {
      /* enviar solicitud de login */
      const data = await fetch(`${apiBaseUrl}/auth/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nombre: username, password: password })
      })

      if (data.ok) {
        const dataResponse = await data.json()
        setuserLogged(dataResponse)
        changeSubmitBtnAppearence('#LoginBtn', 'Login', 'black')
        notification('Longged Successfully', './green-check.png', 'good')
        /* habilitar crear evento en funcion de los permisos del rol */
        rolPermisionFeatures()
        /* remove Register option in hedaer */
        document.querySelector('#registerLink').remove()
        /* render Events */
        setTimeout(() => {
          if (!document.querySelector('#events-section')) {
            Events()
          }
        }, 2000)
      } else {
        notification('User or pasword incorrect', './redcross.png', 'bad')
        changeSubmitBtnAppearence('#LoginBtn', 'Login', 'black')
      }
    }
  } catch (error) {
    /* Events Btn header  */
    console.log(`error ${error}`)
    notification('User or pasword incorrect', './redcross.png', 'bad')
  }
}
export default Login
