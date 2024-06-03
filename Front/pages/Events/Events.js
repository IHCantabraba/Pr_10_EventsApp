import createArticle from '../../components/common/EventArticle/eventArticle'
import ShowEventSelected from '../../components/common/EventSelectedPage/EventSelected'
import RemoveEventPage from '../../utils/RemoveEventPage'
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
    /* TODO save events inside /.data/events.json */
    return eventsList
  } catch (error) {
    const errorMsg = `Error occurred while fetching: ${error}`
    return errorMsg
  }
}

const insertEvents = async () => {
  const events = await getEvents()
  const EventsSection = document.querySelector('#events-section')
  if (EventsSection) {
    for (let event of events) {
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
    }
    const eventsBtn = document.querySelectorAll('#openEvent')

    for (let eventBtn of eventsBtn) {
      console.log(eventBtn)
      eventBtn.addEventListener(
        'click',
        (e) => {
          OpenPage(e.target.classList[0])
        },
        { once: false }
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
    const EventInfo = await fetch(`http://localhost:3000/api/v1/events/${id}`)
    const EventData = await EventInfo.json()

    document.querySelector('main').innerHTML += ShowEventSelected(EventData)
    /* close page Btn functionality */
    document
      .querySelector('#closePage')
      .addEventListener('click', () => RemoveEventPage())
  } catch (error) {
    console.log(`Error occurred while openning detailed info of Event ${id}`)
  }
}
const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
