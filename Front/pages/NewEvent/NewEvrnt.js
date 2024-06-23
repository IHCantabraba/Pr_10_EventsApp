import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import './NewEvent.css'
import datepicker from 'js-datepicker'
import Events from '../Events/Events'
const template = () => `
  <section id="event-register-form">
    <form id="event-register-page">
      <div id="first-row-form">
         <div id="form-title-info"> 
        <p id="titulo">Título del evento</p>
        ${InputElem(
          'text',
          'Título del evento',
          'new-event-name',
          '',
          'required'
        )}
        </div>
        <div id="form-location-info">
          <p id="new-event-location-P">Ubicacion del evento</p>
         ${InputElem(
           'text',
           'Ubicacion del evento',
           'new-event-location',
           '',
           'required'
         )}
        </div>
      </div>
      <div id="form-second-row">
        <div id="form-desc">
         <p id="new-event-desc-P">Breve descripción</p>
        ${InputElem(
          'text',
          '2 descriptive Words',
          'new-event-desc',
          '',
          'required'
        )}
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
      <textarea id="new-event-longdesc" placeholder="(Optional)" class="longText" ></textarea>
      <div id="NewEventBtns">
        ${Btn('NewEventSubmit', 'Publicar', 'new-event-submit-btn')}
        ${Btn('CancelNewEvent', 'Cancelar', 'new-event-cancel-btn')}
      </div>
    </form>
  </section>
`
//${InputElem('text', '(Optional)', 'new-event-longdesc', 'longText')}
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
  let insertedData = []
  try {
    const token = JSON.parse(sessionStorage.getItem('user')).token
    const creator_id = JSON.parse(sessionStorage.getItem('user')).user._id
    const start = document.querySelector('.start').value
    insertedData.push(start)
    const end = document.querySelector('.end').value
    const titulo = document.querySelector('#new-event-name').value
    insertedData.push(titulo)
    const ubicacion = document.querySelector('#new-event-location').value
    insertedData.push(ubicacion)
    const desc = document.querySelector('#new-event-desc').value
    insertedData.push(desc)
    const longDesc = document.querySelector('#new-event-longdesc').value
    const img = document.querySelector('#new-event-img').files[0]
    insertedData.push(img)
    let plazas = document.querySelector('#new-event-places').value
    let reserva
    if (plazas !== '') {
      reserva = true
    } else {
      reserva = false
      plazas = 9999
    }
    const fecha = calculateDate(start, end)

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
    data.append('createdBy', creator_id)
    if (!insertedData.includes('')) {
      const response = await fetch('http://localhost:3000/api/users/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      })
      if (response.ok) {
        document
          .querySelector('#main')
          .append(
            MsgTemplate(
              'Succesfully created Event',
              './green-check.png',
              'good'
            )
          )
        document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
        setTimeout(() => {
          if (!document.querySelector('#events-section')) {
            Events()
          }
        }, 2000)
      } else {
        console.log(response)
        document
          .querySelector('#main')
          .append(
            MsgTemplate('Please review all fields', './redcross.png', 'bad')
          )
        document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
      }
    } else {
      document
        .querySelector('#main')
        .append(
          MsgTemplate('Please fill all needed data', './redcross.png', 'bad')
        )
      document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
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
    .addEventListener('click', () => Events())
  /* funcionalidad del boton publicar */
  document
    .querySelector('.new-event-submit-btn')
    .addEventListener('click', (e) => {
      e.preventDefault()
      const PublicarBtn = document.querySelector('.new-event-submit-btn')
      PublicarBtn.textContent = 'Creando...'
      PublicarBtn.style.backgroundColor = 'lightcoral'

      CreateNewEvent()
    })
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
