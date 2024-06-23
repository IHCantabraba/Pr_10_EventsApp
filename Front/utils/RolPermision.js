import NewEvent from '../pages/NewEvent/NewEvrnt'
import OrganizedEvents from '../pages/Organizados/Organizados'
const insertAnchor = (id, nombre, previo) => {
  /* crear anchor para Crear Evento */
  const addAnchor = document.createElement('a')
  addAnchor.href = '#'
  addAnchor.id = id
  addAnchor.textContent = nombre
  /* obtener secion del heade */
  const headerpages = document.querySelector('#app-Pages')
  /* obtener anchor previo al que se quiere insertar */
  const referenceAnchor = document.querySelector(`#${previo}`)
  if (!document.querySelector(`#${id}`)) {
    headerpages.insertBefore(addAnchor, referenceAnchor)
  } else {
    console.log('anchor already exists')
  }
}
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
