import LandingTemplate from '../components/Landing/Landing'
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

      insertAnchor('loginLink', 'Login', 'registerLink')
      LandingTemplate()
    })
  }
}

export default LogoutFucntion
