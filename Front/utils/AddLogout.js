import LogoutFucntion from './LogoutFucntion'

const addAnchor = (id, nombre, previo) => {
  /* crear anchor para Crear Evento */
  const addAnchor = document.createElement('a')
  addAnchor.href = '#'
  addAnchor.id = id
  addAnchor.textContent = nombre
  /* obtener secion del heade */
  const headerpages = document.querySelector('#app-Pages')

  if (!document.querySelector(`#${id}`)) {
    headerpages.append(addAnchor)
  } else {
    console.log('anchor already exists')
  }
  /* eliminar loggin */
  document.querySelector('#loginLink').remove()
}

const addUserLog = () => {
  const div = document.createElement('div')
  div.id = 'userLogged'
  const img = document.createElement('img')
  img.classList.add('userIcon')
  img.src = 'no.image.png'
  const p = document.createElement('p')
  p.classList.add('userName')
  p.textContent = 'No user'
  div.append(img)
  div.append(p)
  const head = document.querySelector('#header')
  head.append(div)
}
const LogoutTemplate = () => {
  //<a href="#" id="logoutLink">Long Out</a>
  addAnchor('logoutLink', 'LogOut')
  addUserLog()
  LogoutFucntion()

  /* <div id="userLogged">
          <img class="userIcon" src="no-image.png"></img>
          <p class="userName">No user</p></div> */
}
export default LogoutTemplate
