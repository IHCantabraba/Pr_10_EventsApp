import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import Events from '../Events/Events'
import './NewEvent.css'
import datepicker from 'js-datepicker'
const template = () => `
  <section id="event-register-form">
    <form id="event-register-page">
      <p id="titulo">Título del evento</p>
      ${InputElem('text', 'Título del evento', 'new-event-name')}
      <p id="new-event-location">Ubicacion del evento</p>
      ${InputElem('text', 'Ubicacion del evento', 'new-event-location')}
      <p id="new-event-desc">Breve descripción</p>
      ${InputElem('text', 'Descripcion', 'new-event-desc')}
      <p id="fechas">fecha o rango de fecha</p>
      <div id="new-event-dates">
        ${InputElem('text', '', 'new-event-date-start', 'start')}
        ${InputElem('text', '', 'new-event-date-start', 'end')}
      </div>
      ${InputElem('file', '', 'new-event-img', 'new-event-img')}
      <p id="new-event-longdesc">Descripcion Detallada</p>
      ${InputElem('text', '', 'new-even-longdesc')}
      <div id="NewEventBtns">
        ${Btn('NewEventSubmit', 'Publicar', 'new-event-submit-btn')}
        ${Btn('CancelNewEvent', 'Cancelar', 'new-event-cancel-btn')}
      </div>
    </form>
  </section>
`
const calculateDate = (start, end) => {
  if (end.length === 0) {
    let fechaEvento =
      start.split('/')[0] +
      '-' +
      start.split('/')[1] +
      '-' +
      start.split('/')[2]
    return fechaEvento
  } else {
    let fechaEvento =
      start.split('/')[0] +
      '-' +
      end.split('/')[0] +
      '-' +
      end.split('/')[1] +
      '-' +
      end.split('/')[2]
    return fechaEvento
  }
}
const CreateNewEvent = async () => {
  const start = document.querySelector('.start').value
  const end = document.querySelector('.end').value
  const titulo = document.querySelector('#new-event-name').value
  const ubicacion = document.querySelector('#new-event-location').value
  const desc = document.querySelector('#new-event-desc').value
  const longDesc = document.querySelector('#new-event-longdesc').value
  const img = document.querySelector('#new-event-img').files[0]
  console.log(start)
  console.log(end.length)
  const fecha = calculateDate(start, end)
  console.log(fecha)
  try {
    const form = document.querySelector('#event-register-page')
    const data = new FormData(form)
    data.append('titulo', titulo)
    data.append('ubicacion', ubicacion)
    data.append('descripcion', desc)
    data.append('fecha', fecha)
    data.append(img)
    data.append('longDescription', longDesc)

    const response = await fetch('http://localhost:3000/api/user/events', {
      method: 'POST',
      body: data,
      mode: 'cors',
      cache: 'default'
    })
    if (response.ok) {
      MsgTemplate('Succesfully created Event', './green-check.png', 'good')
    }
  } catch (error) {
    console.log(error)
    MsgTemplate('Error while creating event', './redcross.png', 'bad')
    RemoveMsgDiv()
  }
}
const NewEvent = () => {
  document.querySelector('main').innerHTML = template()
  /* funcinalidad del bton cancelar */
  document
    .querySelector('.new-event-cancel-btn')
    .addEventListener('click', () => CreateNewEvent())
  /* funcionalidad del boton publicar */
  const submitBtn = document
    .querySelector('.new-event-submit-btn')
    .addEventListener('click', () => CreateNewEvent())
  const start = datepicker('.start', {
    id: 1,
    customDays: ['M', 'T', 'W', 'Th', 'F', 'S', 'S'],
    // Customizations.
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      input.value = value
    }
  })

  const end = datepicker('.end', {
    id: 1,
    customDays: ['M', 'T', 'W', 'Th', 'F', 'S', 'S'],
    // Customizations.
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      input.value = value
    }
  })
}

export default NewEvent
