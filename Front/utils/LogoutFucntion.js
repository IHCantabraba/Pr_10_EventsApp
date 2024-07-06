import LandingTemplate from '../components/Landing/Landing'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import addAnchor from './addAnchor'
import insertAnchor from './insertAnchor'

const LogoutFucntion = () => {
  if (sessionStorage.getItem('user')) {
    document.querySelector('#logoutLink').addEventListener('click', () => {
      /* eliminar la sesion */
      sessionStorage.removeItem('user')
      /* eliminar logout anchor y logged user */
      document.querySelector('#logoutLink').remove()
      document.querySelector('#userLogged').remove()
      /* eliminar pestañas de permisos específicos */
      if (document.querySelector('#NewEvent')) {
        document.querySelector('#NewEvent').remove()
      }
      if (document.querySelector('#OrganEvents')) {
        document.querySelector('#OrganEvents').remove()
      }
      addAnchor('registerLink', 'Register')
      insertAnchor('loginLink', 'Login', 'registerLink')
      /* Register Btn from Header */
      document.querySelector('#registerLink').addEventListener('click', () => {
        if (!sessionStorage.getItem('user')) {
          Register()
        } else {
          Login()
        }
      })
      /* login btn from register page */
      document
        .querySelector('#loginLink')
        .addEventListener('click', () => Login())
      LandingTemplate()
    })
  }
}

export default LogoutFucntion
