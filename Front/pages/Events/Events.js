import createArticle from '../../components/common/EventArticle/eventArticle'
import './Events.css'
import OpenPage from '../EventSelectedPage/EventSelected'
const template = () =>
  `
<section id="events-section"></section>`

const getEvents = async () => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  console.log(userLogged)
  const token = userLogged.token
  try {
    const events = await fetch('http://localhost:3000/api/events', {
      headers: {
        Authorization: `Bearer ${token}`,
        credentian: 'include'
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

const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
