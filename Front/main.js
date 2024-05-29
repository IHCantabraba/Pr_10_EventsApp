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
document
  .querySelector('#landing-register-btn')
  .addEventListener('click', () => {
    Register()
  })
document
  .querySelector('#landing-login-btn')
  .addEventListener('click', () => Login())
document.querySelector('#Events').addEventListener('click', Events())
// document.querySelector('#check').addEventListener('change', function (e) {
//   e.Themes()
// })
