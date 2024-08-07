import './Organizados.css'
import createArticle from '../../components/common/EventArticle/eventArticle'
import Login from '../Login/Login'
import PublisherOpenPage from '../PublisherEventSelectedPage/PublisherEventSelectedPage'
import { apiBaseUrl } from '../../utils/ServicePath/apiBaseUrl'
const template = () =>
  `
<section id="Publisher-events-section" class="withEvents"></section>`

const getOrganizedEvents = async () => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  const token = userLogged.token
  const id = userLogged.user._id
  try {
    const events = await fetch(`${apiBaseUrl}/events/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        credential: 'include'
      }
    })
    if (events.ok) {
      const eventsList = await events.json()
      return eventsList
    } else {
      refreshSession()
    }
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
    e1.limitParticipantes - e1.users.length <
    e2.limitParticipantes - e2.users.length
      ? -1
      : e1.limitParticipantes - e1.users.length >
        e2.limitParticipantes - e2.users.length
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
    if (event.limitParticipantes - event.users.length > 0) {
      reserved.innerHTML = 'Reserva Ya!'
    } else {
      reserved.textContent = 'Completo'
      reserved.style.backgroundColor = 'lightcoral'
    }
  } else {
    reserved.textContent = 'Sin Reserva'
  }
  if (reserved.textContent === 'Sin Reserva') {
    reserved.style.backgroundColor = 'lightgreen'
  }
  /* cambair simbología si no hay plazas */

  const places = document.querySelector('.freePlaces')
  if (places.textContent.includes('Agotado')) {
    places.style.backgroundColor = 'lightcoral'
    const efecto = document.querySelector('.effectP')
    efecto.textContent = 'Completo'
  }
  /* estado del evento */
  console.log(event.estado)
  if (event.estado === 'cancelado') {
    const Evento2Cancel = document.querySelector(`label[name="${event._id}"]`)
    Evento2Cancel.classList.toggle('notCanceled')
    Evento2Cancel.classList.toggle('Canceled')
  }
}
const showEvents = (events) => {
  /* ordenar de menos plazas a màs */
  const sortedEvents = orderEvents(events)
  /* obtener seccion de eventos */
  const EventsSection = document.querySelector('#Publisher-events-section')
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
        PublisherOpenPage(e.target.id)
      })
    }
  }
}
const insertEvents = async () => {
  /* obtener los eventos en BBDD */
  const events = await getOrganizedEvents()
  if (events.length !== 0) {
    showEvents(events)
  } else {
    /* TODO cambiar estilo de la página con una clase */

    const PublisherEventsSection = document.querySelector(
      '#Publisher-events-section'
    )
    PublisherEventsSection.classList.toggle('withEvents')
    PublisherEventsSection.classList.toggle('withOutEvents')

    const p = document.createElement('p')
    p.id = 'no-publisher-events-p'
    p.textContent = 'You have no published any event jet'
    PublisherEventsSection.append(p)
  }
}

const OrganizedEvents = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default OrganizedEvents
