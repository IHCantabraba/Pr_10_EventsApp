import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import createArticle from '../../components/common/EventArticle/eventArticle'
import ShowEventSelected from '../../components/common/EventSelectedPage/EventSelected'
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
      const places = document.querySelector('.freePlaces')
      if (places.textContent.includes('0')) {
        places.style.backgroundColor = 'lightcoral'
      }
    }
    const eventsBtn = document.querySelectorAll('.openEvent')

    for (let eventBtn of eventsBtn) {
      eventBtn.addEventListener(
        'click',
        (e) => {
          OpenPage(e.target.id)
        }
        // { once: false }
      )
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

    document.querySelector('main').innerHTML += ShowEventSelected(EventData)
    /* close page Btn functionality */
    document
      .querySelector('.closePage')
      .addEventListener('click', () => RemoveEventPage())
    /* apuntate btn functionality */
    document
      .querySelector('.EventSelectedBtnJoin')
      .addEventListener('click', () => RegisterInEvent(id))

    const places = document.querySelector('.freePlaces')
    if (places.textContent.includes('0')) {
      console.log('0 plazas')
      const joinBtn = document.querySelector('.EventSelectedBtnJoin')
      joinBtn.disabled = true
      joinBtn.textContent = 'No more Places'
    }
    /* ver participantes btn functionality TODO */
  } catch (error) {
    console.log(`Error occurred while openning detailed info of Event ${id}`)
  }
}
const RegisterInEvent = async (id) => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  const token = userLogged.token
  const userNombre = userLogged.user.nombre
  const useremail = userLogged.user.email
  const userId = userLogged.user._id
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
