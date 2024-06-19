import createArticle from '../../components/common/EventArticle/eventArticle'
import './Events.css'
import OpenPage from '../EventSelectedPage/EventSelected'
import Login from '../Login/Login'
const template = () =>
  `
<section id="events-section"></section>`

const getEvents = async () => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  const token = userLogged.token
  try {
    const events = await fetch('http://localhost:3000/api/events', {
      headers: {
        Authorization: `Bearer ${token}`,
        credential: 'include'
      }
    })
    console.log(events.status, events.ok)
    if (events.ok) {
      const eventsList = await events.json()
      return eventsList
    } else {
      refreshSession()
    }
    // const eventsList = await events.json()
    // return eventsList
  } catch (error) {
    const errorMsg = `Error occurred while fetching: ${error}`
    return errorMsg
  }
}

const refreshSession = () => {
  sessionStorage.removeItem('user')
  document.querySelector('.userIcon').src = './no-image.png'
  document.querySelector('.userName').textContent = 'No user Logged'
  Login()
}
const orderEvents = (events) => {
  /* ordenar de menos plazas a màs */
  const sortedEvents = events.sort((e1, e2) =>
    e1.limitParticipantes < e2.limitParticipantes
      ? -1
      : e1.limitParticipantes > e2.limitParticipantes
      ? 1
      : 0
  )
  return sortedEvents
}
const articleAspect = (event) => {
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
const showEvents = (events) => {
  /* ordenar de menos plazas a màs */
  const sortedEvents = orderEvents(events)
  /* obtener seccion de eventos */
  const EventsSection = document.querySelector('#events-section')
  /* añadir eventos si existe la sección */
  if (EventsSection) {
    for (let event of sortedEvents) {
      const article = createArticle(event)
      EventsSection.innerHTML += article
      articleAspect(event)
    }
    /* obtener el botón de cada evento */
    const eventsBtn = document.querySelectorAll('.openEvent')
    /* añadir funcionalidad a cada boton */
    for (let eventBtn of eventsBtn) {
      eventBtn.addEventListener('click', (e) => {
        OpenPage(e.target.id)
      })
    }
  }
}
const insertEvents = async () => {
  /* obtener los eventos en BBDD */
  const events = await getEvents()
  /* comprobar si se han obtenido o si ha expirado el token
  ... si ha expirado lanzar login y sino, insertar eventos */
  // JSON.stringify(events).includes('TokenExpiredError')
  //   ? refreshSession()
  if (events) {
    showEvents(events)
  }
}

const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
