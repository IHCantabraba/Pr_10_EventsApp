import './style.css'
import HeaderTemplate from './components/Header/header'
import LandingTemplate from './components/Landing/Landing'
import Register from './pages/Register'
import main from './components/main/main'
/* insertar el header */
HeaderTemplate()
main()
LandingTemplate()

document
  .querySelector('#landing-register-btn')
  .addEventListener('click', () => {
    Register()
  })
document
  .querySelector('#landing-login-btn')
  .addEventListener('click', () => LoginPage())
