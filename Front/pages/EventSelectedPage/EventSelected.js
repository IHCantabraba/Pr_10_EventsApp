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
        <button class="EventSelectedBtnShowAsistance btn">Ver Participantes</button>
      </div>
    </div>
  </section>
  `
  return selectedEvent
}
// export default ShowEventSelected

const blurContent = (events) => {
  events.classList.toggle('blur')
}
/* abrir página de detalle del Evento */
const OpenPage = async (id) => {
  console.log(`openning event id ${id}`)
  const events = document.querySelector('#events-section')
  blurContent(events)

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
      .addEventListener('click', () => {
        console.log(id)

        RegisterInEvent(id)
      })
    /* ver participantes btn functionality */
    document
      .querySelector('.EventSelectedBtnShowAsistance')
      .addEventListener('click', () => {
        const btn = document.querySelector('.EventSelectedBtnShowAsistance')
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
      const joinBtns = document.querySelectorAll(`.EventSelectedBtnJoin`)
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

const RegisterInEvent = async (id) => {
  const userLogged = JSON.parse(sessionStorage.getItem('user'))
  const token = userLogged.token
  const userNombre = userLogged.user.nombre
  const useremail = userLogged.user.email
  const userId = userLogged.user._id
  const userImg = userLogged.user.img

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
    if (response.status !== 201) {
      const page = document.querySelector('.EventSelectedPage ')
      page.appendChild(
        MsgTemplate('Successfully Reservation', './green-check.png', 'good')
      )
      RemoveMsgDiv()
    } else {
      const page = document.querySelector('.EventSelectedPage ')
      page.appendChild(
        MsgTemplate(` Event Reserved already !`, './redcross.png', 'bad')
      )
      RemoveMsgDiv()
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`)
  }
}

export default OpenPage
