import Btn from '../Button/button'
import './attendeesList.css'

const template = () => {
  const ul = document.createElement('ul')
  ul.id = 'attendees'
  ul.classList.add('show')
  return ul
}

const showAsistanceList = async (asistentes) => {
  console.log(asistentes)
  const participantesList = document.querySelector('#attendees')
  if (participantesList.length !== 0) {
    for (let asistente of asistentes) {
      const li = document.createElement('li')
      li.classList.add('li')
      li.id = asistente.nombre
      li.innerHTML = `
      <img src="${asistente.img}" >
      <label>${asistente.nombre}</label>
      ${Btn(`${asistente.AttendeeId}`, 'Details', 'attendeBtn')} 
    `
      participantesList.appendChild(li)
    }
    const detailedBtn = document.querySelectorAll('.attendeBtn')
    for (let btn of detailedBtn) {
      btn.addEventListener('click', async () => {
        const contactInfo = await showAttendeContact(btn.id)
        const li = document.querySelector(`#${contactInfo.nombre}`)
        const p = document.createElement('p')
        p.id = 'contact'
        p.textContent = contactInfo.email
        li.append(p)
      })
    }
  }
}

const showAttendeContact = async (userId) => {
  try {
    const userInfo = await fetch(
      `http://localhost:3000/api/attendees/${userId}`
    )
    if (userInfo.ok) {
      let contact = await userInfo.json()
      return contact
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`)
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
