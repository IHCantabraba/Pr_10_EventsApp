import './attendeesList.css'

const template = () => `
  <ul id="attendees"></ul>
`

const showAsistanceList = (asistentes) => {
  console.log(asistentes)
  const participantesList = document.querySelector('#attendees')
  console.log(participantesList)
  for (let asistente of asistentes) {
    const li = document.createElement('li')
    li.innerHTML = `
      <img src="${asistente.img}" >
      <p>${asistente.nombre}</p>
    `
    participantesList.appendChild(li)
  }
}

const Participantes = (asistentes) => {
  document.querySelector('.EventSelectedMoreInfo').innerHTML += template()
  showAsistanceList(asistentes)
}
export default Participantes
