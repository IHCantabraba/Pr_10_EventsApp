import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import './NewEvent.css'
import datepicker from 'js-datepicker'
const template = () => `
  <section id="event-register-form">
    <form id="event-register-page">
      <div id="first-row-form">
         <div id="form-title-info"> 
        <p id="titulo">Título del evento</p>
        ${InputElem('text', 'Título del evento', 'new-event-name')}
        </div>
        <div id="form-location-info">
          <p id="new-event-location-P">Ubicacion del evento</p>
         ${InputElem('text', 'Ubicacion del evento', 'new-event-location')}
        </div>
      </div>
      <div id="form-second-row">
        <div id="form-desc">
         <p id="new-event-desc-P">Breve descripción</p>
        ${InputElem('text', 'Descripcion', 'new-event-desc')}
        </div>
        <div id="form-places">
         <p id="eventPlaces"> Número de plazas</p>
         ${InputElem('text', '(Optional)', 'new-event-places')}
        </div>
      </div>
      <p id="fechas">fecha o rango de fecha</p>
      <div id="new-event-dates">
        ${InputElem('text', '', 'new-event-date-start', 'start')}
        ${InputElem('text', '', 'new-event-date-start', 'end')}
      </div>
      <p id="img-text"> Seleccionar imagen del evento</p>
      ${InputElem('file', '', 'new-event-img', 'new-event-imgF')}
      <p id="new-event-longdesc-P">Descripcion Detallada</p>
      ${InputElem('text', '(Optional)', 'new-event-longdesc')}
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
  const token = JSON.parse(sessionStorage.getItem('user')).token
  const start = document.querySelector('.start').value
  const end = document.querySelector('.end').value
  const titulo = document.querySelector('#new-event-name').value
  const ubicacion = document.querySelector('#new-event-location').value
  const desc = document.querySelector('#new-event-desc').value
  const longDesc = document.querySelector('#new-event-longdesc').value
  const img = document.querySelector('#new-event-img').files[0]
  const plazas = document.querySelector('#new-event-places').value
  let reserva
  if (plazas !== '') {
    reserva = true
  } else {
    reserva = false
  }
  const fecha = calculateDate(start, end)
  try {
    const form = document.querySelector('#event-register-page')
    const data = new FormData(form)
    data.append('titulo', titulo)
    data.append('fecha', fecha)
    data.append('ubicacion', ubicacion)
    data.append('descripcion', desc)
    data.append('longDescription', longDesc)
    data.append('reserva', reserva)
    data.append('img', img)
    data.append('limitParticipantes', Number(plazas))

    const response = await fetch('http://localhost:3000/api/users/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
    if (response.ok) {
      MsgTemplate('Succesfully created Event', './green-check.png', 'good')
    } else {
      console.log(response)
    }
  } catch (error) {
    console.log(error)
    const NewEventDiv = document.querySelector('#event-register-form')
    NewEventDiv.append(
      MsgTemplate('Error while creating event', './redcross.png', 'bad')
    )
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
