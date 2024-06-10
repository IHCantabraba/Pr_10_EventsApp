import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
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
const verFechas = () => {
  const start = document.querySelector('.start')
  const end = document.querySelector('.end')
  console.log(start.value)
  console.log(end.value)
}
const NewEvent = () => {
  document.querySelector('main').innerHTML = template()
  /* funcinalidad del bton cancelar */
  document
    .querySelector('.new-event-cancel-btn')
    .addEventListener('click', () => Events())
  /* funcionalidad del boton publicar */
  const submitBtn = document
    .querySelector('.new-event-submit-btn')
    .addEventListener('click', () => verFechas())
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
