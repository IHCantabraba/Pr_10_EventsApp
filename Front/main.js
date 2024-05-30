import './style.css'
import HeaderTemplate from './components/Header/header'
import LandingTemplate from './components/Landing/Landing'
import Register from './pages/Register/Register'
import main from './components/main/main'
import footer from './components/footer/footer'
import Login from './pages/Login/Login'
import Events from './pages/Events/Events'
/* insertar el header */
HeaderTemplate()
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
})
/* Register Btn from Header */
document.querySelector('#registerLink').addEventListener('click', () => {
  Register()
})
/* logout Btn Header */
document.querySelector('#logoutLink').addEventListener('click', () => {
  localStorage.removeItem('user')
  document.querySelector('.userIcon').src = './no-image.png'
  document.querySelector('.userName').textContent = 'No user Logged'
  Login()
})
// document.querySelector('#check').addEventListener('change', function (e) {
//   e.Themes()
// })
