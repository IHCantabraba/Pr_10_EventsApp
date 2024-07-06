import Events from '../pages/Events/Events'
import notification from './notification'
import rolPermisionFeatures from './RolPermision'
import setuserLogged from './setUserLogged'

const autologinFromRegister = async (username, password) => {
  const data = await fetch('http://localhost:3000/api/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ nombre: username, password: password })
  })
  if (data.ok) {
    const dataResponse = await data.json()
    /* almacenar usuario y token de la sesion y añadir logut btn e img */
    setuserLogged(dataResponse)
    // changeSubmitBtnAppearence('#LoginBtn', 'Login', 'black')
    notification('Longged Successfully', './green-check.png', 'good')
    /* habilitar crear evento en funcion de los permisos del rol */
    rolPermisionFeatures()
    /* render Events */
    setTimeout(() => {
      if (!document.querySelector('#events-section')) {
        Events()
      }
    }, 2000)
  }
}
export default autologinFromRegister
