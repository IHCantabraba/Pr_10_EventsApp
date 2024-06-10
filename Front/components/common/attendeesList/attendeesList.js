import './attendeesList.css'

const template = () => {
  const ul = document.createElement('ul')
  ul.id = 'attendees'
  ul.classList.add('show')
  return ul
}

const showAsistanceList = (asistentes) => {
  console.log(asistentes)
  const participantesList = document.querySelector('#attendees')
  if (participantesList.length !== 0) {
    for (let asistente of asistentes) {
      const li = document.createElement('li')
      li.classList.add('li')
      li.innerHTML = `
      <img src="${asistente.img}" >
      <p>${asistente.nombre}</p>
    `
      participantesList.appendChild(li)
    }
  }
}

const Participantes = (asistentes) => {
  const DivInfo = document.querySelector('.EventSelectedMoreInfo')
  if (document.querySelector('#attendees')) {
    const list = document.querySelector('#attendees')
    list.classList.toggle('show')
    list.classList.toggle('hide')
  } else {
    DivInfo.append(template())
    showAsistanceList(asistentes)
  }
}
export default Participantes
