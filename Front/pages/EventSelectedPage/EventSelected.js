import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import Participantes from '../../components/common/attendeesList/attendeesList'
import RemoveEventPage from '../../utils/RemoveEventPage'
import RemoveMsgDiv from '../../utils/RemoveMsgDiv'
import './EventSelected.css'

const ShowEventSelected = (eventSelected) => {
  let longDescription = eventSelected.longDescription
  if (longDescription === '') {
    longDescription =
      '...Information Not available right now. Sorry for disturbances...'
  }
  const selectedEvent = `
  <section class="EventSelectedPage show">
    <button class="closePage" background-img="./redcross.png"></button>
    <div class="EventSelectedBasicInfo">
      <img class="EventSelectedimg" src="${eventSelected.img}"/>
      <h2 class="EventSelectedTitle">${eventSelected.titulo}</h2>
      <p class="EventSelectedFecha">${eventSelected.fecha}</p>
      <p class="EventSelectedLocation">${eventSelected.ubicacion}</p>
    </div>
    <div class="EventSelectedMoreInfo">
      <p class="EventselectedLongDescrp">${longDescription}</p>
      <div class="EventSelectedPageOptions">
        <button class="EventSelectedBtnJoin btn ${eventSelected._id}">Apuntate!</button>
        <button class="EventSelectedBtnShowAsistance btn">Participantes</button>
      </div>
    </div>
  </section>
  `
  return selectedEvent
}
// export default ShowEventSelected
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

    /* seleccionar el freePlaces del elemento clickado */
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
      const ParsedResponse = await response.json()
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

export default OpenPage
