import createArticle from '../../components/common/EventArticle/eventArticle'
import './Events.css'

const template = () =>
  `
<section id="events-section"></section>`

const getEvents = async () => {
  const userLogged = sessionStorage.getItem('user')
  const token = userLogged.token
  try {
    const events = await fetch('http://localhost:3000/api/v1/events', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const eventsList = await events.json()
    console.log(eventsList)
    return eventsList
  } catch (error) {
    const errorMsg = `Error occurred while fetching: ${error}`
    return errorMsg
  }
}

const insertEvents = async () => {
  const events = await getEvents()
  console.log(`obtained events are: ${events}`)
  const EventsSection = document.querySelector('#events-section')
  if (EventsSection) {
    console.log('inserting')

    for (let event of events) {
      const article = createArticle(event)
      EventsSection.innerHTML += article
      document
        .querySelector('#openEvent')
        .addEventListener('click', () => OpenPage())
      const reserved = document.querySelector(`.${event.titulo}`)

      if (reserved.textContent === 'true') {
        reserved.innerHTML = 'Reserva Ya!'
      } else {
        reserved.textContent = 'Sin Reserva'
      }
      if (reserved.textContent === 'Sin Reserva') {
        reserved.style.backgroundColor = 'lightgreen'
      }
    }
  }
}
/* Implementar ficha completa del Evento.
  Botón de apuntarse, de ver participantes */
const OpenPage = () => {
  console.log('ready to open page')
}
const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
