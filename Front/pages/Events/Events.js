import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import createArticle from '../../components/common/EventArticle/eventArticle'
import ShowEventSelected from '../../components/common/EventSelectedPage/EventSelected'
import Participantes from '../../components/common/attendeesList/attendeesList'
import RemoveEventPage from '../../utils/RemoveEventPage'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import './Events.css'
const template = () =>
  `
<section id="events-section"></section>`

const getEvents = async () => {
  const userLogged = sessionStorage.getItem('user')
  const token = userLogged.token
  try {
    const events = await fetch('http://localhost:3000/api/events', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const eventsList = await events.json()
    /* TODO save events inside /.data/events.json */
    return eventsList
  } catch (error) {
    const errorMsg = `Error occurred while fetching: ${error}`
    return errorMsg
  }
}

const insertEvents = async () => {
  const events = await getEvents()
  /* ordenar de menos plazas a màs */
  const sortedEvents = events.sort((e1, e2) =>
    e1.limitParticipantes < e2.limitParticipantes
      ? -1
      : e1.limitParticipantes > e2.limitParticipantes
      ? 1
      : 0
  )
  const EventsSection = document.querySelector('#events-section')
  if (EventsSection) {
    for (let event of sortedEvents) {
      const article = createArticle(event)
      EventsSection.innerHTML += article
      const reserved = document.querySelector(
        `.${event.titulo.replaceAll(' ', '')}`
      )
      if (reserved.textContent === 'true') {
        reserved.innerHTML = 'Reserva Ya!'
      } else {
        reserved.textContent = 'Sin Reserva'
      }
      if (reserved.textContent === 'Sin Reserva') {
        reserved.style.backgroundColor = 'lightgreen'
      }
      /* cambair simbología si no hay plazas */
      /* TODO revisar */
      const places = document.querySelector('.freePlaces')
      if (places.textContent.includes('0')) {
        places.style.backgroundColor = 'lightcoral'
      }
    }
    const eventsBtn = document.querySelectorAll('.openEvent')

    for (let eventBtn of eventsBtn) {
      eventBtn.addEventListener('click', (e) => {
        OpenPage(e.target.id)
      })
    }
  }
}
/* abrir página de detalle del Evento */
const OpenPage = async (id) => {
  console.log(`openning event id ${id}`)
  const eventsPage = document.querySelector('#events-section')
  if (!eventsPage.classList.contains('blur')) {
    eventsPage.classList.add('blur')
  }
  try {
    const EventInfo = await fetch(`http://localhost:3000/api/events/${id}`)
    const EventData = await EventInfo.json()
    console.log(EventData)
    /* insert detailed event page */
    document.querySelector('main').innerHTML += ShowEventSelected(EventData)
    /* close page Btn functionality */
    document
      .querySelector('.closePage')
      .addEventListener('click', () => RemoveEventPage())
    /* apuntate btn functionality */
    document
      .querySelector('.EventSelectedBtnJoin')
      .addEventListener('click', () => RegisterInEvent(id))

    /* TODO ver cómo seleccionar el freePlaces del elemento clickado */
    const places = document.querySelectorAll(`.freePlaces`)
    for (let place of places) {
      if (place.textContent.includes('0')) {
        let targetId = place.classList[1]
        const joinBtns = document.querySelectorAll(`.EventSelectedBtnJoin`)
        for (let joinBtn of joinBtns) {
          const btnId = joinBtn.classList[2]
          if (targetId === btnId) {
            console.log(`id: ${id} tiene ${place.textContent} plazas libres`)
            joinBtn.disabled = true
            joinBtn.textContent = 'No more Places'
            break
          }
        }
      }
    }
    /* ver participantes btn functionality TODO */
    document
      .querySelector('.EventSelectedBtnShowAsistance')
      .addEventListener('click', () => ShowParticipants(id))
  } catch (error) {
    console.log(`Error occurred while openning detailed info of Event ${id}`)
  }
}
const ShowParticipants = async (id) => {
  let asistentes = []
  try {
    const response = await fetch('http://localhost:3000/api/attendees')
    if (response.ok) {
      const ParsedResponse = response.json()
      console.log(ParsedResponse)
      /* para cada asistente registrado en general */
      for (let asistente of ParsedResponse) {
        /* obtener eventos en los que se ha registrado */
        const eventosRegistrados = asistente.events
        for (let event of eventosRegistrados) {
          /* si el evento coincide con el que se está viendo */
          /* .... añadirlo a la lista de asistente sde dicho evento */
          if (event._id === id) {
            asistentes.push({
              nombre: asistente.nombre,
              email: asistente.email,
              img: asistente.img,
              userId: asistente.users
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
// const showAsistanceList = async (asistente) => {
//   console.log(asistente)
// }
const RegisterInEvent = async (id) => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  const token = userLogged.token
  const userNombre = userLogged.user.nombre
  const useremail = userLogged.user.email
  const userId = userLogged.user._id
  const userImg = userLogged.user.img
  /* hay que asegurarse de que no está ya registrado en el evento */

  /* register user on event */
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/attendees/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: userNombre,
          email: useremail,
          users: userId,
          img: userImg,
          events: id
        })
      }
    )
    console.log(response)
    if (response.ok) {
      document.querySelector('.EventSelectedPage ').innerHTML += MsgTemplate(
        'Successfully Reservation',
        './green-check.png',
        'good'
      )
      RemoveMsgDiv()
    } else {
      document.querySelector('.EventSelectedPage ').innerHTML += MsgTemplate(
        ` Event Reserved already !`,
        './redcross.png',
        'bad'
      )
      RemoveMsgDiv()
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`)
  }
}

const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
