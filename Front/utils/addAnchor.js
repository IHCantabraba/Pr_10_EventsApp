const addAnchor = (id, nombre) => {
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
}
export default addAnchor
