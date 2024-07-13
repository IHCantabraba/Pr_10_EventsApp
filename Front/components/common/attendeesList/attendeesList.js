import Btn from '../Button/button'
import './attendeesList.css'
import { apiBaseUrl } from '../../../utils/ServicePath/apiBaseUrl'
const template = () => {
  const ulDiv = document.createElement('div')
  ulDiv.id = 'UlContainer'
  const ul = document.createElement('ul')
  ul.id = 'attendees'
  ul.classList.add('show')
  ulDiv.append(ul)
  return ulDiv
}

const showAsistanceList = async (asistentes) => {
  const participantesList = document.querySelector('#attendees')
  if (participantesList.length > 0) {
    console.log('hay particiantes')
    for (let asistente of asistentes) {
      let img

      if (asistente.img === 'undefined') {
        img = 'no-image.png'
      } else {
        img = asistente.img
      }
      const li = document.createElement('li')
      li.classList.add('li')
      li.id = asistente.nombre
      li.innerHTML = `
      <img src="${img}" >
      <label>${asistente.nombre}</label>
      ${Btn(
        `${asistente.AttendeeId}`,
        'Detalles',
        `attendeBtn ${asistente.nombre}`
      )} 
    `
      participantesList.appendChild(li)
    }
    const detailedBtn = document.querySelectorAll('.attendeBtn')
    for (let btn of detailedBtn) {
      btn.addEventListener('click', async () => {
        const contactInfo = await showAttendeContact(btn.id)

        /* cambair boton detalles */
        switchDetailBtn(contactInfo)
      })
    }
  } else {
    console.log('no hay participante')
    const text = document.createElement('p')
    text.classList.add('noPerson')
    text.textContent = ' Sin participantes'
    participantesList.appendChild(text)
  }
}
const switchDetailBtn = (contactInfo) => {
  const li = document.querySelector(`#${contactInfo.nombre}`)
  const p = document.createElement('p')
  p.id = `contact${contactInfo.nombre}`
  p.textContent = contactInfo.email
  /* si el contacto no se ha insertado aún */
  const detailBtn = document.querySelector(`.${contactInfo.nombre}`)
  if (!document.querySelector(`#contact${contactInfo.nombre}`)) {
    li.insertBefore(p, detailBtn)
    /* cambiar apariencia del botón */
    detailBtn.textContent = 'Ocultar'
  } /* si ya se ha insertado, quitarlo*/ else {
    /* cambiar apariencia del botón */
    detailBtn.textContent = 'Detalles'
    document.querySelector(`#contact${contactInfo.nombre}`).remove()
  }
}
const showAttendeContact = async (userId) => {
  try {
    const userInfo = await fetch(`${apiBaseUrl}/attendees/${userId}`)
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
