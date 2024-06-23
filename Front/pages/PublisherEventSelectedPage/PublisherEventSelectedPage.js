import './PublisherEventSelectedPage.css'
import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import Participantes from '../../components/common/attendeesList/attendeesList'
import RemoveEventPage from '../../utils/RemoveEventPage'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'

const ShowEventSelected = (eventSelected) => {
  let longDescription = eventSelected.longDescription
  if (longDescription === '') {
    longDescription =
      '...Information Not available right now. Sorry for disturbances...'
  }
  const selectedEvent = `
  <section class="Publisher-EventSelectedPage show">
    <button class="Publisher-closePage" background-img="./redcross.png"></button>
    <div class="Publisher-EventSelectedBasicInfo">
      <img class="Publisher-EventSelectedimg" src="${eventSelected.img}"/>
      <h2 class="Publisher-EventSelectedTitle">${eventSelected.titulo}</h2>
      <p class="Publisher-EventSelectedFecha">${eventSelected.fecha}</p>
      <p class="Publisher-EventSelectedLocation">${eventSelected.ubicacion}</p>
    </div>
    <div class="Publisher-EventSelectedMoreInfo">
      <p class="Publisher-EventselectedLongDescrp">${longDescription}</p>
      <div class="Publisher-EventSelectedPageOptions">
        <button class="Publisher-EventSelectedBtnJoin btn ${eventSelected._id}">Cancelar Evento!</button>
        <button class="Publisher-EventSelectedBtnShowAsistance btn">Ver Participantes</button>
      </div>
    </div>
  </section>
  `
  return selectedEvent
}
// export default ShowEventSelected

const blurContent = (id) => {
  const elem = document.querySelector(`#${id}`)
  elem.classList.toggle('blur')
}

/* abrir página de detalle del Evento */
const PublisherOpenPage = async (id) => {
  console.log(`openning event id ${id}`)
  // const events = document.querySelector('#Publisher-events-section')
  blurContent('Publisher-events-section')

  try {
    const EventInfo = await fetch(`http://localhost:3000/api/events/${id}`)
    const EventData = await EventInfo.json()

    /* insert detailed event page */
    document.querySelector('main').innerHTML += ShowEventSelected(EventData)
    /* close page Btn functionality */
    document
      .querySelector('.Publisher-closePage')
      .addEventListener('click', () => {
        blurContent('Publisher-events-section')
        RemoveEventPage('Publisher-EventSelectedPage')
      })
    /* Cancelar btn functionality */
    document
      .querySelector('.Publisher-EventSelectedBtnJoin')
      .addEventListener('click', () => {
        CancelEvent(id)
      })
    /* ver participantes btn functionality */
    document
      .querySelector('.Publisher-EventSelectedBtnShowAsistance')
      .addEventListener('click', () => {
        const btn = document.querySelector(
          '.Publisher-EventSelectedBtnShowAsistance'
        )
        if (btn.textContent === 'Ver Participantes') {
          btn.textContent = 'Ocultar'
        } else {
          btn.textContent = 'Ver Participantes'
        }
        ShowParticipants(id)
      })
    /* check remaining free places */
    checkFreePlaces()
    /* seleccionar el freePlaces del elemento clickado */
  } catch (error) {
    console.log(`Error occurred while openning detailed info of Event ${id}`)
  }
}
const checkFreePlaces = () => {
  const places = document.querySelectorAll(`.freePlaces`)
  for (let place of places) {
    if (place.textContent.includes('0')) {
      console.log(place.textContent)
      let targetId = place.classList[1]
      const joinBtns = document.querySelectorAll(
        `.Publisher-EventSelectedBtnJoin`
      )
      for (let joinBtn of joinBtns) {
        const btnId = joinBtn.classList[2]
        if (targetId === btnId) {
          console.log(
            `id: ${targetId} tiene ${place.textContent} plazas libres`
          )
          joinBtn.disabled = true
          joinBtn.textContent = 'No more Places'
        }
      }
    }
  }
}
const ShowParticipants = async (id) => {
  let asistentes = []
  try {
    const response = await fetch('http://localhost:3000/api/attendees')
    if (response.ok) {
      const ParsedResponse = await response.json()
      /* para cada asistente registrado en general */
      for (let asistente of ParsedResponse) {
        /* obtener eventos en los que se ha registrado */
        const eventosRegistrados = asistente.events
        for (let event of eventosRegistrados) {
          /* si el evento coincide con el que se está viendo */
          /* .... añadirlo a la lista de asistentes de dicho evento */
          if (event._id === id) {
            asistentes.push({
              nombre: asistente.nombre,
              email: asistente.email,
              img: asistente.img,
              userId: asistente.users,
              AttendeeId: asistente._id
            })
          }
        }
      }
      Participantes(asistentes)
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`)
  }
}

const CancelEvent = async (id) => {
  const Evento2Cancel = document.querySelector(`label[name="${id}"]`)
  Evento2Cancel.classList.toggle('notCanceled')
  Evento2Cancel.classList.toggle('Canceled')

  //     const page = document.querySelector('.Publisher-EventSelectedPage ')
  //     page.appendChild(
  //       MsgTemplate(` Event Reserved already !`, './redcross.png', 'bad')
  //     )
  //     RemoveMsgDiv()
}

export default PublisherOpenPage
