import LogoutTemplate from './AddLogout'

const setuserLogged = (dataResponse) => {
  /* guardar los datos d eusuairo logueado */
  sessionStorage.setItem('user', JSON.stringify(dataResponse))
  /* añadir secciond e logout */
  LogoutTemplate()
  /* actualizar nombre y foto del usuair logueado */
  const userIcon = document.querySelector('.userIcon')
  /* adding user name and icon to log session */
  if (dataResponse.user.img === 'undefined') {
    userIcon.src = 'no-image.png'
  } else {
    userIcon.src = dataResponse.user.img
  }
  const loggedName = document.querySelector('.userName')
  loggedName.innerHTML = dataResponse.user.nombre
}

export default setuserLogged
