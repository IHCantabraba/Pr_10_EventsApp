const rolPermisionFeatures = () => {
  /* habilitar crear evento en funcion de los permisos del rol */
  try {
    const rol = JSON.parse(sessionStorage.getItem('user')).user.rol
    if (rol === 'admin' || rol === 'publisher') {
      const addAnchor = document.createElement('a')
      addAnchor.href = '#'
      addAnchor.id = 'NewEvent'
      addAnchor.textContent = 'Crear Evento'
      const headerpages = document.querySelector('#app-Pages')
      const referenceAnchor = document.querySelector('#loginLink')
      headerpages.insertBefore(addAnchor, referenceAnchor)
      const CrearEvent = document.querySelector('#NewEvent')
      /* NewEvent header btn functionality */
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
    }
  } catch (error) {}
}
export default rolPermisionFeatures
