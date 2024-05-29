import createArticle from '../../components/common/EventArticle/eventArticle'
import './Events.css'

const template = () =>
  `
<section id="events-section"></section>`

const insertEvents = async (section) => {
  const events = getEvents()
  console.log(typeof events)
  const EventsSection = document.querySelector('#events-section')
  if (section) {
    for (let event of events) {
      const article = createArticle(event)
      EventsSection.innerHTML += article
    }
  }
}
const getEvents = async () => {
  try {
    const events = await fetch('http://localhost:3000/api/v1/events')
    const eventsList = await events.json()
    return eventsList
  } catch (error) {
    const errorMsg = `Error occurred while fetching: ${error}`
    return errorMsg
  }
}
const Events = () => {
  document.querySelector('main').innerHTML = template()
  insertEvents()
}

export default Events
