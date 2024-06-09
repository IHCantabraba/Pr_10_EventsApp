import './attendeesList.css'

const template = () => `
  <ul id="attendees"></ul>
`

const showAsistanceList = (asistentes) => {
  console.log(asistentes)
  const participantesList = document.getElementById('#attendees')

  for (const asistente of asistentes) {
    const li = document.createElement('li')
    li.innerHTML = `
      <img src="${asistente.img}" >
      <p>${asistente.nombre}</p>
    `
    participantesList.append(li)
  }
}

const Participantes = (asistentes) => {
  document.querySelector('.EventSelectedMoreInfo').innerHTML += template()
  showAsistanceList(asistentes)
}
export default Participantes
