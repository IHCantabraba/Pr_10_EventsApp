import './style.css'
import HeaderTemplate from './components/Header/header'
import LandingTemplate from './components/Landing/Landing'
import Register from './pages/Register/Register'
import main from './components/main/main'
import footer from './components/footer/footer'
import Login from './pages/Login/Login'
import Events from './pages/Events/Events'
import rolPermisionFeatures from './utils/RolPermision'
import MsgTemplate from './components/common/BottonMsg/BottomMsg'
import RemoveMsgDiv from './utils/RemoveMsgDiv'
import LogoutFucntion from './utils/LogoutFucntion'

/* insertar el header */
HeaderTemplate()
main()
LandingTemplate()
footer()
if (sessionStorage.getItem('user')) {
  rolPermisionFeatures()
}
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

document.querySelector('#loginLink').addEventListener('click', () => {
  Login()
})

/* Register Btn from Header */
document.querySelector('#registerLink').addEventListener('click', () => {
  if (!sessionStorage.getItem('user')) {
    Register()
  } else {
    Login()
  }
})

/* Events Btn from Header */
document.querySelector('#EventsLink').addEventListener('click', () => {
  if (sessionStorage.getItem('user')) {
    Events()
  } else {
    document
      .querySelector('main')
      .append(MsgTemplate('Login or register First', './redcross.png', 'bad'))
    RemoveMsgDiv()
  }
})
/* logout Btn Header */
if (document.querySelector('#logoutLink')) {
  LogoutFucntion()
}

/* update image and name of logged user */
if (sessionStorage.getItem('user')) {
  document.querySelector('.userName').textContent = JSON.parse(
    sessionStorage.getItem('user')
  ).user.nombre

  /* si no ha añadido foto al registrarse utilizar la default */
  if (
    !JSON.parse(sessionStorage.getItem('user')).user.img ||
    JSON.parse(sessionStorage.getItem('user')).user.img === 'undefined'
  ) {
    document.querySelector('.userIcon').src = 'no-image.png'
  } else {
    document.querySelector('.userIcon').src = JSON.parse(
      sessionStorage.getItem('user')
    ).user.img
  }
  Events()
}
