import './style.css'
import HeaderTemplate from './components/Header/header'
import LandingTemplate from './components/Landing/Landing'
import Register from './pages/Register/Register'
import main from './components/main/main'
import footer from './components/footer/footer'
import Login from './pages/Login/Login'
import Events from './pages/Events/Events'
import NewEvent from './pages/NewEvent/NewEvrnt'

/* insertar el header */
HeaderTemplate()
const Themes = () => {
  console.log('inside themes')
  const slider = document.getElementById('check')
  if (slider.checked == true) {
    console.log('checked')
  } else {
    console.log('unchecked')
  }
}
const slider = document.getElementById('check')
slider.onclick = Themes
main()
LandingTemplate()
footer()
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
  /* time sleep 1sec */
  if (document.querySelector('#alreadyLogged')) {
    setTimeout(() => {
      /* resetea valores de clicks */
      Events()
    }, 1000)
  }
})

/* Register Btn from Header */
document.querySelector('#registerLink').addEventListener('click', () => {
  Register()
})
/* logout Btn Header */
document.querySelector('#logoutLink').addEventListener('click', () => {
  sessionStorage.removeItem('user')
  document.querySelector('.userIcon').src = './no-image.png'
  document.querySelector('.userName').textContent = 'No user Logged'
  Login()
})

document.querySelector('#NewEvent').addEventListener('click', () => {
  NewEvent()
})
// document.querySelector('#check').addEventListener('change', function (e) {
//   e.Themes()
// })
