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
export default insertAnchor
