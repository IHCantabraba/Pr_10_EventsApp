import selectedEvent from '../../components/SelectedEvent/EeventSelected'
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
  selectedEvent(eventSelected, longDescription)
}
// export default ShowEventSelected

const blurContent = (id) => {
  const elem = document.querySelector(`#${id}`)
  elem.classList.toggle('blur')
}
/* abrir página de detalle del Evento */
const OpenPage = async (id) => {
  console.log(`openning event id ${id}`)
  blurContent('events-section')

  try {
    const EventInfo = await fetch(`http://localhost:3000/api/events/${id}`)
    const EventData = await EventInfo.json()
    ShowEventSelected(EventData)
    // /* insert detailed event page */
    // document.querySelector('main').innerHTML += ShowEventSelected(EventData)
    /* close page Btn functionality */
    document.querySelector('.closePage').addEventListener('click', () => {
      blurContent('events-section')
      RemoveEventPage('EventSelectedPage')
    })
    /* apuntate btn functionality */
    const EventCancelado = document.querySelector(`label[name="${id}"]`)
    if (EventCancelado.classList.contains('Canceled')) {
      const Btn2Cancel = document.querySelector('.EventSelectedBtnJoin')
      Btn2Cancel.disabled = true
      Btn2Cancel.textContent = 'Can not Register'
    } else {
      document
        .querySelector('.EventSelectedBtnJoin')
        .addEventListener('click', () => {
          console.log(id)
          RegisterInEvent(id)
        })
    }

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
    if (Number(place.textContent) === 0) {
      let targetId = place.classList[1]
      const joinBtns = document.querySelectorAll(`.EventSelectedBtnJoin`)
      for (let joinBtn of joinBtns) {
        const btnId = joinBtn.classList[2]
        if (targetId === btnId) {
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
