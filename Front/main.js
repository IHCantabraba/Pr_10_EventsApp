import './style.css'
import HeaderTemplate from './components/Header/header'
import LandingTemplate from './components/Landing/Landing'
import Register from './pages/Register/Register'
import main from './components/main/main'
import footer from './components/footer/footer'
import Themes from './components/common/SliderBtn/SliderAction'
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
  .addEventListener('click', () => LoginPage())

// document.querySelector('#check').addEventListener('change', function (e) {
//   e.Themes()
// })
