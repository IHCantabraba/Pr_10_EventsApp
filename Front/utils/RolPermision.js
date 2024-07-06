import NewEvent from '../pages/NewEvent/NewEvrnt'
import OrganizedEvents from '../pages/Organizados/Organizados'
import insertAnchor from './insertAnchor'

const rolPermisionFeatures = () => {
  /* habilitar crear evento en funcion de los permisos del rol */
  try {
    const rol = JSON.parse(sessionStorage.getItem('user')).user.rol
    if (rol === 'admin' || rol === 'publisher') {
      insertAnchor('NewEvent', 'Crear Evento', 'EventsLink')
      insertAnchor('OrganEvents', 'Organizados', 'EventsLink')

      /* NewEvent header btn functionality */
      const CrearEvent = document.querySelector(`#NewEvent`)
      CrearEvent.addEventListener('click', () => {
        sessionStorage.getItem('user')
          ? NewEvent()
          : document
              .querySelector('main')
              .append(
                MsgTemplate('Login or Register First!', './redcross.png', 'bad')
              )
        document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
      })
      /* NewEvent header btn functionality */
      const Organized = document.querySelector(`#OrganEvents`)
      Organized.addEventListener('click', () => {
        sessionStorage.getItem('user')
          ? OrganizedEvents()
          : document
              .querySelector('main')
              .append(
                MsgTemplate('Login or Register First!', './redcross.png', 'bad')
              )
        document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
      })
    }
  } catch (error) {
    console.log(error)
  }
}
export default rolPermisionFeatures
