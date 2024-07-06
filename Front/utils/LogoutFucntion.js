import Login from '../pages/Login/Login'

const LogoutFucntion = () => {
  if (sessionStorage.getItem('user')) {
    document.querySelector('#logoutLink').addEventListener('click', () => {
      /* eliminar la sesion */
      sessionStorage.removeItem('user')
      /* eliminar logout anchor y logged user */
      document.querySelector('#logoutLink').remove()
      document.querySelector('#userLogged').remove()
      // document.querySelector('.userIcon').src = './no-image.png'
      // document.querySelector('.userName').textContent = 'No user Logged'
      if (document.querySelector('#NewEvent')) {
        document.querySelector('#NewEvent').remove()
      }
      if (document.querySelector('#OrganEvents')) {
        document.querySelector('#OrganEvents').remove()
      }
      Login()
    })
  }
}

export default LogoutFucntion
