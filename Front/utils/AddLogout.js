import LogoutFucntion from './LogoutFucntion'
import addAnchor from './addAnchor'

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
  addAnchor('logoutLink', 'LogOut')
  document.querySelector('#loginLink').remove()
  addUserLog()
  LogoutFucntion()
}
export default LogoutTemplate
