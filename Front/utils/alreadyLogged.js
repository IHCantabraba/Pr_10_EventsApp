import LogoutTemplate from './AddLogout'

const template = () =>
  `<h2 id="alreadyLogged"> You are already logged. Redirecting to Events page... </h2> `

const alreadyLogeed = () => {
  const sesion = sessionStorage.getItem('user')
  console.log(sesion.user)
  if (sesion) {
    console.log('yes')
    if (
      !document.querySelector('#logoutLink') &&
      !document.querySelector('#userLogged')
    ) {
      LogoutTemplate()
      /* actualizar nombre y foto del usuair logueado */
      const userIcon = document.querySelector('.userIcon')
      /* adding user name and icon to log session */
      if (sesion.user.img === 'undefined') {
        userIcon.src = 'no-image.png'
      } else {
        userIcon.src = sesion.user.img
      }
      const loggedName = document.querySelector('.userName')
      loggedName.innerHTML = sesion.user.nombre
    }
  }
  return template
}
export default alreadyLogeed
